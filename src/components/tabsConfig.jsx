// src/tabsConfig.js

import PIESCheckin from './tabs/PIESCheckin';
import Growth from './tabs/Growth';
import Tips from './tabs/Tips';
import Events from './tabs/Events';
import Memberships from './tabs/Memberships';
import Favorites from './tabs/Favorites';
import Production from './tabs/Production';

export const tabMap = {
    checkin: {
        label: 'PIES Checkin',
        component: <PIESCheckin />,
    },
    tips: {
        label: 'Tips',
        component: <Tips />,
    },
    favorites: {
        label: '⭐ Favorites',
        component: <Favorites />,
    },
    growth: {
        label: 'Growth',
        component: <Growth />,
    },
    events: {
        label: 'Events',
        component: <Events />,
    },
    memberships: {
        label: 'Memberships',
        component: <Memberships />,
    },
    production: {
        label: 'Production',
        component: <Production />,
    },
    analytics: {
        label: 'Analytics',
        component: <div>Analytics tab coming soon</div>,
    },
    cohort: {
        label: 'My Cohort',
        component: <div>Cohort tab placeholder</div>,
    },
};

export const defaultTabs = ['checkin', 'tips', 'favorites', 'growth', 'events', 'memberships'];

export const roleExtraTabs = {
    owner: ['production', 'analytics'],
    leader: ['cohort'],
    individual: [], // gets only base
};