import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/app-header';
import { AppContent } from '@/components/app-content';
import { ContactCard } from '@/components/contact-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Users } from 'lucide-react';

interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
    phone?: string;
    company?: string;
    position?: string;
    address?: string;
    status: 'active' | 'inactive';
    user?: {
        name: string;
    };
}

interface PaginatedContacts {
    data: Contact[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url?: string;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    contacts: PaginatedContacts;
    filters: {
        search?: string;
        status?: string;
    };
    isAdmin: boolean;
    [key: string]: unknown;
}

export default function ContactsIndex({ contacts, filters, isAdmin }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('contacts.index'), {
            search: searchTerm || undefined,
            status: statusFilter !== 'all' ? statusFilter : undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        router.get(route('contacts.index'), {
            search: searchTerm || undefined,
            status: value !== 'all' ? value : undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AppShell variant="header">
            <Head title="Contacts" />
            
            <AppHeader />
            
            <div className="border-b border-gray-200 bg-white px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Users className="h-6 w-6 text-gray-600" />
                        <h1 className="text-2xl font-bold text-gray-900">
                            Contacts ({contacts.total})
                        </h1>
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
                    {/* Search and Filter Bar */}
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <form onSubmit={handleSearch} className="flex gap-4 items-end">
                            <div className="flex-1">
                                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                                    Search Contacts
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="search"
                                        type="text"
                                        placeholder="Search by name, email, or company..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <Select value={statusFilter} onValueChange={handleStatusChange}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <Button type="submit">Search</Button>
                        </form>
                    </div>

                    {/* Contacts Grid */}
                    {contacts.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {contacts.data.map((contact) => (
                                    <ContactCard 
                                        key={contact.id} 
                                        contact={contact} 
                                        showOwner={isAdmin}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {contacts.last_page > 1 && (
                                <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg border shadow-sm">
                                    <div className="flex items-center text-sm text-gray-700">
                                        Showing {((contacts.current_page - 1) * contacts.per_page) + 1} to{' '}
                                        {Math.min(contacts.current_page * contacts.per_page, contacts.total)} of{' '}
                                        {contacts.total} contacts
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        {contacts.links.map((link, index) => {
                                            if (!link.url) {
                                                return (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 text-gray-400 cursor-not-allowed"
                                                    >
                                                        {link.label.replace('&laquo;', '‹').replace('&raquo;', '›')}
                                                    </span>
                                                );
                                            }
                                            
                                            return (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className={`px-3 py-1 rounded border ${
                                                        link.active
                                                            ? 'bg-blue-500 text-white border-blue-500'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                    }`}
                                                    preserveState
                                                >
                                                    {link.label.replace('&laquo;', '‹').replace('&raquo;', '›')}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <Users className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No contacts found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {filters.search || filters.status ? 
                                    'Try adjusting your search criteria.' : 
                                    'Get started by adding your first contact.'
                                }
                            </p>
                            <div className="mt-6">
                                <Button asChild>
                                    <Link href={route('contacts.create')}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Contact
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </AppContent>
        </AppShell>
    );
}