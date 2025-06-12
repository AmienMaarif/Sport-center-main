<?php

namespace App\Filament\Resources;

use App\Filament\Resources\VenueResource\Pages\CreateVenue;
use App\Filament\Resources\VenueResource\Pages\EditVenue;
use App\Filament\Resources\VenueResource\Pages\ListVenues;
use App\Models\Venue;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\CreateAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Support\Facades\Auth;

class VenueResource extends Resource
{
    protected static ?string $model = Venue::class;

    protected static ?string $navigationIcon = 'heroicon-o-home-modern';
    protected static ?string $navigationLabel = 'Venue';
    protected static ?string $pluralLabel = 'Daftar Lapangan';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')
                ->required()
                ->label('Nama Lapangan'),

            Forms\Components\TextInput::make('type')
                ->required()
                ->label('Tipe (Indoor / Outdoor)')
                ->placeholder('Contoh: Indoor atau Outdoor'),

            Forms\Components\TextInput::make('location')
                ->required()
                ->label('Lokasi')
                ->placeholder('Contoh: Lantai 1 Gedung A'),

            Forms\Components\FileUpload::make('image')
                ->label('Gambar')
                ->image()
                 ->nullable()
                 ->maxSize(2048) // dalam KB (2MB)
                ->directory('venues')
                ->disk('public')
                ->visibility('public')
                ->imagePreviewHeight('100')
                ->dehydrated(),

            Forms\Components\TagsInput::make('facilities')
                ->label('Fasilitas')
                ->placeholder('Contoh: Toilet, Parkir, Mushola'),

            Forms\Components\TextInput::make('price')
                ->numeric()
                ->required()
                ->label('Harga (per jam)'),

            Forms\Components\Textarea::make('description')
                ->label('Deskripsi')
                ->rows(3),

            Forms\Components\TextInput::make('updated_by')
                ->label('Update Oleh')
                ->placeholder('Contoh: Amien / Niken / Rifai / Fariz / Rifdi / Tomagola')
                ->required(),
        ]);
    }

    public static function mutateFormDataBeforeCreate(array $data): array
    {
        $data['created_by'] = 'admin'; // karena semua login pakai akun admin
        $data['created_date'] = now(); // kolom manual, bukan created_at
        $data['updated_at'] = now(); // tetap isi waktu update
        return $data;
    }

    public static function mutateFormDataBeforeSave(array $data): array
    {
    // Jika image tidak diupload saat update, ambil dari record lama
    if (! isset($data['image'])) {
        $data['image'] = request()->route('record')->image ?? null;
    }
    
        $data['updated_at'] = now(); // biarkan updated_by diisi manual
        return $data;
    }

    public static function table(Table $table): Table
{
    return $table
        ->columns([
            // Tombol aksi di paling kiri
            Tables\Columns\TextColumn::make('actions_placeholder') // Placeholder agar posisi actions diatur manual
                ->label('Aksi')
                ->visible(false), // Tidak ditampilkan, hanya untuk posisi

            ImageColumn::make('image')
                ->label('Foto')
                ->url(fn ($record) =>
                    $record->image
                        ? asset('storage/' . $record->image)
                        : asset('images/default.jpg')
                )
                ->disk('public')
                ->height(50)
                ->width(50)
                ->square(),

            TextColumn::make('name')
                ->label('Lapangan')
                ->limit(25)
                ->searchable(),

            TextColumn::make('type')
                ->label('Tipe')
                ->badge()
                ->color(fn ($state) => $state === 'Indoor' ? 'info' : 'success'),

            TextColumn::make('location')
                ->label('Lokasi')
                ->limit(25),
TextColumn::make('price')
    ->label('Harga')
    ->formatStateUsing(fn ($state) => 'Rp. ' . number_format($state, 2, ',', '.')),


            TextColumn::make('created_by')
                ->label('Dibuat'),

            TextColumn::make('created_date')
                ->label('Tanggal Buat')
                ->dateTime('d M Y - H:i'),

            TextColumn::make('updated_by')
                ->label('Update'),

            TextColumn::make('updated_at')
                ->label('Diupdate')
                ->since(),
        ])
        ->actions([
            EditAction::make()->label('Ubah'),
            DeleteAction::make()->label('Hapus'),
        ])
        ->actionsPosition(\Filament\Tables\Enums\ActionsPosition::BeforeColumns)
 // <<< INI YANG PENTING: Pindahkan tombol ke sebelah kiri
        ->headerActions([
            CreateAction::make()->label('Tambah Venue'),
        ])
        ->searchable()
        ->defaultSort('created_date', 'desc');
}


    public static function getPages(): array
    {
        return [
            'index' => ListVenues::route('/'),
            'create' => CreateVenue::route('/create'),
            'edit' => EditVenue::route('/{record}/edit'),
        ];
    }
}
