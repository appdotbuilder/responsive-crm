import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/app-header';
import { AppContent } from '@/components/app-content';
import { ContactForm } from '@/components/contact-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UserPlus } from 'lucide-react';

interface ContactFormData {
    first_name: string;
    last_name: string;
    email?: string;
    phone?: string;
    company?: string;
    position?: string;
    address?: string;
    notes?: string;
    status: 'active' | 'inactive';
    [key: string]: string | undefined;
}

interface Props {
    errors: Record<string, string>;
    [key: string]: unknown;
}

export default function CreateContact({ errors }: Props) {
    const handleSubmit = (data: ContactFormData) => {
        router.post(route('contacts.store'), data);
    };

    return (
        <AppShell variant="header">
            <Head title="Create Contact" />
            
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
                        <UserPlus className="h-6 w-6 text-gray-600" />
                        <h1 className="text-2xl font-bold text-gray-900">Create New Contact</h1>
                    </div>
                </div>
            </div>

            <AppContent>
                <div className="max-w-5xl mx-auto">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Add New Contact</h2>
                        <p className="text-gray-600 mt-1">
                            Fill in the details below to create a new contact in your CRM.
                        </p>
                    </div>

                    <ContactForm 
                        onSubmit={handleSubmit}
                        isSubmitting={false}
                        errors={errors}
                        submitLabel="Create Contact"
                    />
                </div>
            </AppContent>
        </AppShell>
    );
}