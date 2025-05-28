import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
});

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;

// ─── PIES API Calls ─────────────────────────────────────────────
export async function fetchGrowthSummary() {
    const response = await instance.get("/growth_summary");
    return response.data;
}

export async function createPIESCheckin(data) {
    return await instance.post('/pies_entries', data);
}

// ─── Org Membership API Calls ─────────────────────────────

// Add new members to an organization (superuser can pass organizationId)
export async function addOrgMembers(members, organizationId = null) {
    const payload = { members };
    if (organizationId) payload.organization_id = organizationId;

    const res = await instance.post('/orgs/members', payload);
    return res.data;
}

// Update roles for existing members
export async function updateOrgMemberRoles(members) {
    const res = await instance.patch('/orgs/members', { members });
    return res.data;
}