<?php

namespace App\Filament\Resources;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use App\Models\Venue;

use App\Filament\Resources\VenueResource\Pages\ListVenues;
use App\Filament\Resources\VenueResource\Pages\CreateVenue;
use App\Filament\Resources\VenueResource\Pages\EditVenue;


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

            Forms\Components\FileUpload::make('image')
    ->label('Gambar')
    ->image()
    ->directory('venues')
    ->disk('public')
    ->visibility('public')
    ->imagePreviewHeight('100')
    ->preserveFilenames()
    ->loadingIndicatorPosition('left')
    ->panelAspectRatio('2:1')
    ->removeUploadedFileButtonPosition('right')
    ->uploadProgressIndicatorPosition('left'),

            Forms\Components\TextInput::make('price')
                ->numeric()
                ->required()
                ->label('Harga (per jam)'),

            Forms\Components\Textarea::make('description')
                ->label('Deskripsi')
                ->rows(3),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Gambar')
                    ->disk('public'),

                Tables\Columns\TextColumn::make('name')
                    ->label('Nama'),

                Tables\Columns\TextColumn::make('price')
                    ->label('Harga'),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d M Y')
                    ->label('Dibuat')
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
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
