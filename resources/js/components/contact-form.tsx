import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Contact {
    id?: number;
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

interface ContactFormProps {
    contact?: Contact;
    onSubmit: (data: Omit<Contact, 'id'>) => void;
    isSubmitting: boolean;
    errors: Record<string, string>;
    submitLabel?: string;
    [key: string]: unknown;
}

export function ContactForm({ 
    contact, 
    onSubmit, 
    isSubmitting, 
    errors, 
    submitLabel = 'Save Contact' 
}: ContactFormProps) {
    const { data, setData, processing } = useForm({
        first_name: contact?.first_name || '',
        last_name: contact?.last_name || '',
        email: contact?.email || '',
        phone: contact?.phone || '',
        company: contact?.company || '',
        position: contact?.position || '',
        address: contact?.address || '',
        notes: contact?.notes || '',
        status: contact?.status || 'active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Basic Information */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>
                            Enter the contact's personal and professional details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="first_name">
                                    First Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="first_name"
                                    type="text"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    className={errors.first_name ? 'border-red-500' : ''}
                                    placeholder="John"
                                />
                                {errors.first_name && (
                                    <p className="text-sm text-red-600 mt-1">{errors.first_name}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="last_name">
                                    Last Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="last_name"
                                    type="text"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    className={errors.last_name ? 'border-red-500' : ''}
                                    placeholder="Doe"
                                />
                                {errors.last_name && (
                                    <p className="text-sm text-red-600 mt-1">{errors.last_name}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={errors.email ? 'border-red-500' : ''}
                                    placeholder="john.doe@example.com"
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className={errors.phone ? 'border-red-500' : ''}
                                    placeholder="+1 (555) 123-4567"
                                />
                                {errors.phone && (
                                    <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="company">Company</Label>
                                <Input
                                    id="company"
                                    type="text"
                                    value={data.company}
                                    onChange={(e) => setData('company', e.target.value)}
                                    className={errors.company ? 'border-red-500' : ''}
                                    placeholder="Acme Corporation"
                                />
                                {errors.company && (
                                    <p className="text-sm text-red-600 mt-1">{errors.company}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="position">Position</Label>
                                <Input
                                    id="position"
                                    type="text"
                                    value={data.position}
                                    onChange={(e) => setData('position', e.target.value)}
                                    className={errors.position ? 'border-red-500' : ''}
                                    placeholder="Software Developer"
                                />
                                {errors.position && (
                                    <p className="text-sm text-red-600 mt-1">{errors.position}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                                id="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                className={errors.address ? 'border-red-500' : ''}
                                placeholder="123 Main St, City, State 12345"
                                rows={2}
                            />
                            {errors.address && (
                                <p className="text-sm text-red-600 mt-1">{errors.address}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Information */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Label htmlFor="status">Contact Status</Label>
                            <Select value={data.status} onValueChange={(value: 'active' | 'inactive') => setData('status', value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && (
                                <p className="text-sm text-red-600 mt-1">{errors.status}</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Notes</CardTitle>
                            <CardDescription>
                                Additional information about this contact.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                className={errors.notes ? 'border-red-500' : ''}
                                placeholder="Add any additional notes about this contact..."
                                rows={4}
                            />
                            {errors.notes && (
                                <p className="text-sm text-red-600 mt-1">{errors.notes}</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                <Button
                    type="submit"
                    disabled={processing || isSubmitting}
                    className="min-w-[120px]"
                >
                    {processing || isSubmitting ? 'Saving...' : submitLabel}
                </Button>
            </div>
        </form>
    );
}