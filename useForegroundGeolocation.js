  import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Platform, PermissionsAndroid, Alert, ToastAndroid } from 'react-native'
import VIForegroundService from "@voximplant/react-native-foreground-service";
import Geolocation from 'react-native-geolocation-service';
import LocationController from '../Controllers/locationController';


export const useForegroundGeolocation = () => {

    const foregroundServiceInstance = VIForegroundService.getInstance();
    const [liveButtonStatus, setLiveButtonStatus] = useState(false)
    const [loader, setLoader] = useState(false)
    const [invert, setInvert] = useState(true)
    const [location, setLocation] = useState(null);
    const watchId = useRef(null);
    const [observing, setObserving] = useState(false);


    const hasLocationPermission = async () => {

        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show(
                'Location permission denied by user.',
                ToastAndroid.LONG,
            );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show(
                'Location permission revoked by user.',
                ToastAndroid.LONG,
            );
        }
        return false;
    };


    const getLocation = async () => {
        const hasPermission = await hasLocationPermission();

        if (!hasPermission) {
            return;
        }

        Geolocation.getCurrentPosition(
            (position) => {
                setLocation(position);
            },
            (error) => {
                Alert.alert(`Code ${error.code}`, error.message);
                setLocation(null);
                console.log(error);
            },
            {
                accuracy: {
                    android: 'high',
                    ios: 'best',
                },
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
                distanceFilter: 0,
                forceRequestLocation: true,
                forceLocationManager: false,
                showLocationDialog: true,
            },
        );
    };


    const getLocationUpdates = async () => {
        const hasPermission = await hasLocationPermission()

        if (!hasPermission) {
            return;
        }

        if (Platform.OS === 'android') {
            await startForegroundService();
        }

        watchId.current = Geolocation.watchPosition(
            (position) => {
                setLocation(position);
                console.log(position);
            },
            (error) => {
                setLocation(null);
                console.log(error);
            },
            {
                accuracy: {
                    android: 'high',
                    ios: 'best',
                },
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
                distanceFilter: 0,
                forceRequestLocation: true,
                forceLocationManager: false,
                showLocationDialog: true,
            },
        );
    };


    const removeLocationUpdates = useCallback(() => {
        if (watchId.current !== null) {
            stopForegroundService();
            Geolocation.clearWatch(watchId.current);
            watchId.current = null;
            setObserving(false);
            setInvert(true)
        }
    }, [stopForegroundService]);



    const startForegroundService = async () => {

        if (Platform.Version >= 26) {
            const channelConfig = {
                id: 'locationChannel',
                name: 'Location Tracking Channel',
                description: 'Tracks location of user',
                enableVibration: false,
                importance: 2
            }

            await foregroundServiceInstance.createNotificationChannel(channelConfig);
        }
        const notificationConfig = {
            channelId: 'locationChannel',
            id: 420,
            title: "Thirdi",
            text: 'Tracking location updates',
            icon: 'ic_launcher',
            priority: 2,
            button: 'Stop service'
        }

        try {
            subscribeForegroundButtonPressedEvent()
            await foregroundServiceInstance.startService(notificationConfig)
            setInvert(false)
        } catch (_) {
            foregroundServiceInstance.off();
        }

        return foregroundServiceInstance.startService(notificationConfig)
    };

    const VIForegroundServiceButtonPressedHandle =  useCallback(async () => {
        await foregroundServiceInstance.stopService();
        foregroundServiceInstance.off()
        setInvert(true)
        if (watchId.current !== null) {
            Geolocation.clearWatch(watchId.current);
            watchId.current = null;
        }
        console.log("stopped")
    },[]);

    
    const subscribeForegroundButtonPressedEvent = () => {
        foregroundServiceInstance.on('VIForegroundServiceButtonPressed',VIForegroundServiceButtonPressedHandle);
    }


    const stopForegroundService = useCallback(async () => {
        await foregroundServiceInstance.stopService();
        setInvert(true)
        foregroundServiceInstance.off()
        console.log("stopped")
    }, []);

    

    useEffect(() => {
        return () => {
            removeLocationUpdates();
        };
    }, [removeLocationUpdates]);


    useEffect(() => {
        getLocation()
    }, [])


    return {
        location,
        loader,
        invert,
        liveButtonStatus,
        getLocationUpdates,
        removeLocationUpdates
    }

}
