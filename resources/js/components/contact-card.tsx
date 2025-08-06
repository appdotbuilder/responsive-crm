import React from 'react';
import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Mail, Phone, Building, MapPin, User } from 'lucide-react';

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

interface ContactCardProps {
    contact: Contact;
    showOwner?: boolean;
    [key: string]: unknown;
}

export function ContactCard({ contact, showOwner = false }: ContactCardProps) {
    const fullName = `${contact.first_name} ${contact.last_name}`.trim();

    return (
        <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold text-lg leading-tight">
                            <Link
                                href={route('contacts.show', contact.id)}
                                className="hover:text-blue-600 transition-colors"
                            >
                                {fullName}
                            </Link>
                        </h3>
                        {contact.position && contact.company && (
                            <p className="text-sm text-gray-600 mt-1">
                                {contact.position} at {contact.company}
                            </p>
                        )}
                    </div>
                    <Badge variant={contact.status === 'active' ? 'default' : 'secondary'}>
                        {contact.status}
                    </Badge>
                </div>
            </CardHeader>
            
            <CardContent className="pt-0 space-y-2">
                {contact.email && (
                    <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                        <a
                            href={`mailto:${contact.email}`}
                            className="hover:text-blue-600 transition-colors truncate"
                        >
                            {contact.email}
                        </a>
                    </div>
                )}
                
                {contact.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                        <a
                            href={`tel:${contact.phone}`}
                            className="hover:text-blue-600 transition-colors"
                        >
                            {contact.phone}
                        </a>
                    </div>
                )}
                
                {contact.company && !contact.position && (
                    <div className="flex items-center text-sm text-gray-600">
                        <Building className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{contact.company}</span>
                    </div>
                )}
                
                {contact.address && (
                    <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{contact.address}</span>
                    </div>
                )}
                
                {showOwner && contact.user && (
                    <div className="flex items-center text-sm text-gray-500 pt-2 border-t">
                        <User className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">Owner: {contact.user.name}</span>
                    </div>
                )}
                
                <div className="flex gap-2 pt-3">
                    <Button asChild size="sm" variant="outline">
                        <Link href={route('contacts.show', contact.id)}>
                            View
                        </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                        <Link href={route('contacts.edit', contact.id)}>
                            Edit
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}