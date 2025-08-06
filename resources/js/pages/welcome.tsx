import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Users, Shield, Search, BarChart, CheckCircle } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const features = [
        {
            icon: Users,
            title: 'Contact Management',
            description: 'Organize all your contacts in one place with detailed profiles, company info, and notes.'
        },
        {
            icon: Shield,
            title: 'Role-Based Access',
            description: 'Admin users get full access while regular users manage their own contacts securely.'
        },
        {
            icon: Search,
            title: 'Advanced Search',
            description: 'Find contacts quickly with powerful search and filtering by name, company, or status.'
        },
        {
            icon: BarChart,
            title: 'Analytics & Insights',
            description: 'Track your relationships and get insights into your contact management activities.'
        }
    ];

    return (
        <>
            <Head title="Welcome to CRM Pro">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Navigation */}
                <header className="relative z-10">
                    <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                                    <Users className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-gray-900">CRM Pro</span>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                                        >
                                            Sign in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </header>

                <main>
                    {/* Hero Section */}
                    <div className="relative overflow-hidden">
                        <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                    🤝 Manage Your 
                                    <span className="text-blue-600"> Business Relationships</span>
                                </h1>
                                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                                    A powerful CRM solution that helps you organize contacts, track interactions, 
                                    and build meaningful business relationships. Perfect for teams of any size.
                                </p>
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    {auth.user ? (
                                        <Link
                                            href={route('contacts.index')}
                                            className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                                        >
                                            View My Contacts
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('register')}
                                                className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                                            >
                                                Start Free Trial
                                            </Link>
                                            <Link
                                                href={route('login')}
                                                className="text-base font-semibold leading-6 text-gray-900 hover:text-gray-700 transition-colors"
                                            >
                                                Sign in <span aria-hidden="true">→</span>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Screenshot placeholder */}
                        <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl">
                                <div className="aspect-video rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                                    <div className="text-center">
                                        <Users className="mx-auto h-16 w-16 text-blue-600 mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900">Contact Dashboard</h3>
                                        <p className="text-sm text-gray-600 mt-2">Clean, intuitive interface for managing all your contacts</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="py-24 bg-white/80 backdrop-blur">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    Everything you need to manage contacts
                                </h2>
                                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                                    Powerful features designed to help you build and maintain better business relationships.
                                </p>
                            </div>

                            <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                {features.map((feature, index) => {
                                    const Icon = feature.icon;
                                    return (
                                        <div key={index} className="text-center group">
                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
                                                <Icon className="h-8 w-8 text-blue-600" />
                                            </div>
                                            <h3 className="mt-6 text-lg font-medium text-gray-900">{feature.title}</h3>
                                            <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="py-16 bg-gray-50">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold text-gray-900">Why choose CRM Pro?</h2>
                                <p className="mt-4 text-lg text-gray-600">Built for modern businesses that value relationships</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-4" />
                                    <h3 className="font-semibold text-gray-900 mb-2">Easy Setup</h3>
                                    <p className="text-gray-600">Get started in minutes with our intuitive setup process.</p>
                                </div>
                                
                                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-4" />
                                    <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
                                    <p className="text-gray-600">Your data is protected with enterprise-grade security.</p>
                                </div>
                                
                                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-4" />
                                    <h3 className="font-semibold text-gray-900 mb-2">Team Collaboration</h3>
                                    <p className="text-gray-600">Work together with role-based permissions and sharing.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    {!auth.user && (
                        <div className="bg-blue-600">
                            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                        Ready to get started?
                                    </h2>
                                    <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
                                        Join thousands of businesses already using CRM Pro to manage their relationships.
                                    </p>
                                    <div className="mt-8">
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
                                        >
                                            Create Your Account
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                {/* Footer */}
                <footer className="bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600">
                                    <Users className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-900">CRM Pro</span>
                            </div>
                            <p className="text-sm text-gray-500">
                                Built with ❤️ by{" "}
                                <a 
                                    href="https://app.build" 
                                    target="_blank" 
                                    className="font-medium text-blue-600 hover:text-blue-700"
                                >
                                    app.build
                                </a>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}