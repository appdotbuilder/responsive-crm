import { Head, Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/app-header';
import { AppContent } from '@/components/app-content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, Building, Activity, TrendingUp } from 'lucide-react';
import { type SharedData } from '@/types';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    
    // Mock data for demonstration
    const stats = [
        {
            title: 'Total Contacts',
            value: '1,234',
            change: '+12%',
            icon: Users,
            changeType: 'positive' as const
        },
        {
            title: 'Active Contacts',
            value: '1,180',
            change: '+8%', 
            icon: Activity,
            changeType: 'positive' as const
        },
        {
            title: 'Companies',
            value: '456',
            change: '+15%',
            icon: Building,
            changeType: 'positive' as const
        },
        {
            title: 'Growth',
            value: '23%',
            change: '+5%',
            icon: TrendingUp,
            changeType: 'positive' as const
        }
    ];

    return (
        <AppShell variant="header">
            <Head title="Dashboard" />
            
            <AppHeader />
            
            <div className="border-b border-gray-200 bg-white px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Welcome back, {auth.user.name.split(' ')[0]}! 👋
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Here's what's happening with your contacts today.
                        </p>
                    </div>
                    
                    <Button asChild>
                        <Link href={route('contacts.create')}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Contact
                        </Link>
                    </Button>
                </div>
            </div>

            <AppContent>
                <div className="space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <Card key={index}>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium text-gray-600">
                                            {stat.title}
                                        </CardTitle>
                                        <Icon className="h-4 w-4 text-gray-400" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                        <p className="text-xs text-gray-600">
                                            <span className="text-green-600">{stat.change}</span> from last month
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Button asChild variant="outline" className="h-20 flex-col">
                                    <Link href={route('contacts.create')}>
                                        <Plus className="h-6 w-6 mb-2" />
                                        Add New Contact
                                    </Link>
                                </Button>
                                
                                <Button asChild variant="outline" className="h-20 flex-col">
                                    <Link href={route('contacts.index')}>
                                        <Users className="h-6 w-6 mb-2" />
                                        View All Contacts
                                    </Link>
                                </Button>
                                
                                <Button asChild variant="outline" className="h-20 flex-col">
                                    <Link href={route('contacts.index', { status: 'active' })}>
                                        <Activity className="h-6 w-6 mb-2" />
                                        Active Contacts
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm">You added a new contact: John Smith</p>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm">Updated contact information for Alice Johnson</p>
                                        <p className="text-xs text-gray-500">5 hours ago</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm">Added notes to Bob Wilson's profile</p>
                                        <p className="text-xs text-gray-500">1 day ago</p>
                                    </div>
                                </div>
                                
                                <div className="pt-4">
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={route('contacts.index')}>
                                            View All Activity
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </AppContent>
        </AppShell>
    );
}
