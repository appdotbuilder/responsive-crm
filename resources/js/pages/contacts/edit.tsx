import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/app-header';
import { AppContent } from '@/components/app-content';
import { ContactForm } from '@/components/contact-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit } from 'lucide-react';

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
}

interface Props {
    contact: Contact;
    errors: Record<string, string>;
    [key: string]: unknown;
}

export default function EditContact({ contact, errors }: Props) {
    const fullName = `${contact.first_name} ${contact.last_name}`.trim();

    const handleSubmit = (data: ContactFormData) => {
        router.put(route('contacts.update', contact.id), data);
    };

    return (
        <AppShell variant="header">
            <Head title={`Edit ${fullName}`} />
            
            <AppHeader />
            
            <div className="border-b border-gray-200 bg-white px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Button asChild variant="ghost" size="sm">
                            <Link href={route('contacts.show', contact.id)}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Contact
                            </Link>
                        </Button>
                        <div className="h-6 border-l border-gray-300" />
                        <Edit className="h-6 w-6 text-gray-600" />
                        <h1 className="text-2xl font-bold text-gray-900">Edit {fullName}</h1>
                    </div>
                </div>
            </div>

            <AppContent>
                <div className="max-w-5xl mx-auto">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Edit Contact</h2>
                        <p className="text-gray-600 mt-1">
                            Update the contact information below.
                        </p>
                    </div>

                    <ContactForm 
                        contact={contact}
                        onSubmit={handleSubmit}
                        isSubmitting={false}
                        errors={errors}
                        submitLabel="Update Contact"
                    />
                </div>
            </AppContent>
        </AppShell>
    );
}