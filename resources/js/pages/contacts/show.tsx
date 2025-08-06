import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/app-header';
import { AppContent } from '@/components/app-content';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, Mail, Phone, Building, MapPin, User, Trash2, Calendar } from 'lucide-react';

interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
    phone?: string;
    company?: string;
    position?: string;
    address?: string;
    notes?: string;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
    user: {
        name: string;
    };
}

interface Props {
    contact: Contact;
    isAdmin: boolean;
    [key: string]: unknown;
}

export default function ShowContact({ contact, isAdmin }: Props) {
    const fullName = `${contact.first_name} ${contact.last_name}`.trim();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this contact? This action cannot be undone.')) {
            router.delete(route('contacts.destroy', contact.id));
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppShell variant="header">
            <Head title={fullName} />
            
            <AppHeader />
            
            <div className="border-b border-gray-200 bg-white px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Button asChild variant="ghost" size="sm">
                            <Link href={route('contacts.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Contacts
                            </Link>
                        </Button>
                        <div className="h-6 border-l border-gray-300" />
                        <User className="h-6 w-6 text-gray-600" />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{fullName}</h1>
                            {contact.position && contact.company && (
                                <p className="text-sm text-gray-600">
                                    {contact.position} at {contact.company}
                                </p>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Badge variant={contact.status === 'active' ? 'default' : 'secondary'}>
                            {contact.status}
                        </Badge>
                        <Button asChild size="sm" variant="outline">
                            <Link href={route('contacts.edit', contact.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Link>
                        </Button>
                        <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>
            </div>

            <AppContent>
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Contact Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                                <CardDescription>
                                    Personal and professional contact details
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium text-gray-900">Full Name</h4>
                                        <p className="text-gray-600 mt-1">{fullName}</p>
                                    </div>

                                    {contact.email && (
                                        <div>
                                            <h4 className="font-medium text-gray-900 flex items-center">
                                                <Mail className="h-4 w-4 mr-2" />
                                                Email
                                            </h4>
                                            <a
                                                href={`mailto:${contact.email}`}
                                                className="text-blue-600 hover:text-blue-800 mt-1 block"
                                            >
                                                {contact.email}
                                            </a>
                                        </div>
                                    )}

                                    {contact.phone && (
                                        <div>
                                            <h4 className="font-medium text-gray-900 flex items-center">
                                                <Phone className="h-4 w-4 mr-2" />
                                                Phone
                                            </h4>
                                            <a
                                                href={`tel:${contact.phone}`}
                                                className="text-blue-600 hover:text-blue-800 mt-1 block"
                                            >
                                                {contact.phone}
                                            </a>
                                        </div>
                                    )}

                                    {contact.company && (
                                        <div>
                                            <h4 className="font-medium text-gray-900 flex items-center">
                                                <Building className="h-4 w-4 mr-2" />
                                                Company
                                            </h4>
                                            <p className="text-gray-600 mt-1">{contact.company}</p>
                                        </div>
                                    )}

                                    {contact.position && (
                                        <div>
                                            <h4 className="font-medium text-gray-900">Position</h4>
                                            <p className="text-gray-600 mt-1">{contact.position}</p>
                                        </div>
                                    )}
                                </div>

                                {contact.address && (
                                    <div>
                                        <h4 className="font-medium text-gray-900 flex items-center">
                                            <MapPin className="h-4 w-4 mr-2" />
                                            Address
                                        </h4>
                                        <p className="text-gray-600 mt-1 whitespace-pre-line">
                                            {contact.address}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            {/* Status and Metadata */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-gray-900">Status</h4>
                                        <Badge variant={contact.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                                            {contact.status}
                                        </Badge>
                                    </div>

                                    {isAdmin && (
                                        <div>
                                            <h4 className="font-medium text-gray-900">Owner</h4>
                                            <p className="text-gray-600 mt-1">{contact.user.name}</p>
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="font-medium text-gray-900 flex items-center">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            Created
                                        </h4>
                                        <p className="text-gray-600 mt-1 text-sm">
                                            {formatDate(contact.created_at)}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium text-gray-900 flex items-center">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            Updated
                                        </h4>
                                        <p className="text-gray-600 mt-1 text-sm">
                                            {formatDate(contact.updated_at)}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Notes */}
                    {contact.notes && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Notes</CardTitle>
                                <CardDescription>
                                    Additional information about this contact
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 whitespace-pre-line">
                                    {contact.notes}
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-3">
                                {contact.email && (
                                    <Button asChild variant="outline">
                                        <a href={`mailto:${contact.email}`}>
                                            <Mail className="h-4 w-4 mr-2" />
                                            Send Email
                                        </a>
                                    </Button>
                                )}
                                {contact.phone && (
                                    <Button asChild variant="outline">
                                        <a href={`tel:${contact.phone}`}>
                                            <Phone className="h-4 w-4 mr-2" />
                                            Call
                                        </a>
                                    </Button>
                                )}
                                <Button asChild variant="outline">
                                    <Link href={route('contacts.edit', contact.id)}>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Contact
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </AppContent>
        </AppShell>
    );
}