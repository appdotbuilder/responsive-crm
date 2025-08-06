<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $query = Contact::with('user');

        // Regular users can only see their own contacts
        if (!$user->isAdmin()) {
            $query->where('user_id', $user->id);
        }

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->filled('status') && in_array($request->get('status'), ['active', 'inactive'])) {
            $query->where('status', $request->get('status'));
        }

        $contacts = $query->latest()->paginate(12)->withQueryString();

        return Inertia::render('contacts/index', [
            'contacts' => $contacts,
            'filters' => $request->only(['search', 'status']),
            'isAdmin' => $user->isAdmin(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('contacts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContactRequest $request)
    {
        $contact = $request->user()->contacts()->create($request->validated());

        return redirect()->route('contacts.show', $contact)
            ->with('success', 'Contact created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Contact $contact)
    {
        $user = $request->user();

        // Check if user can view this contact
        if (!$user->isAdmin() && $contact->user_id !== $user->id) {
            abort(403, 'Unauthorized to view this contact.');
        }

        return Inertia::render('contacts/show', [
            'contact' => $contact->load('user'),
            'isAdmin' => $user->isAdmin(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Contact $contact)
    {
        $user = $request->user();

        // Check if user can edit this contact
        if (!$user->isAdmin() && $contact->user_id !== $user->id) {
            abort(403, 'Unauthorized to edit this contact.');
        }

        return Inertia::render('contacts/edit', [
            'contact' => $contact,
            'isAdmin' => $user->isAdmin(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContactRequest $request, Contact $contact)
    {
        $user = $request->user();

        // Check if user can update this contact
        if (!$user->isAdmin() && $contact->user_id !== $user->id) {
            abort(403, 'Unauthorized to update this contact.');
        }

        $contact->update($request->validated());

        return redirect()->route('contacts.show', $contact)
            ->with('success', 'Contact updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Contact $contact)
    {
        $user = $request->user();

        // Check if user can delete this contact
        if (!$user->isAdmin() && $contact->user_id !== $user->id) {
            abort(403, 'Unauthorized to delete this contact.');
        }

        $contact->delete();

        return redirect()->route('contacts.index')
            ->with('success', 'Contact deleted successfully.');
    }
}