'use client';
import { useSettings } from '@/context/settingsProvider/settingsProvider';

const HeadClient = () => {
    const { settings } = useSettings();

    if (!settings) return null;

    return (
        <head>
            <title>{settings.site_name}</title>
            <meta name="description" content={settings.site_title} />
            <link rel="icon" href={settings.fav} type="image/x-icon" sizes="16x16" />
        </head>
    );
};

export default HeadClient;