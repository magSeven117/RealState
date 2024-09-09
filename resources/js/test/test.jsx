import React from 'react';
import { render, screen } from '@testing-library/react';
import RenderHouses from '../components/Houses/RenderHouses';
import { house01, house02, house03, house04, house05, house06 } from '../components/imageAssets';

// Datos de prueba que simulan la estructura esperada
const mockHouses = [
    {
        id: 1,
        address: "17879 Strosin Parks Suite 632\nNew Gavin, IN 82720",
        images: ["images/casa1.webp"],
        price: "132912.00",
        description: "Atque est nemo ut fuga incidunt temporibus consequatur. Est ad quo hic reiciendis enim vero illo. Deserunt reiciendis quibusdam dignissimos et eius corporis vero.",
        size: "151.00",
        bathroom: 3,
        quarters: 1,
        floor: 1,
        published: 0,
        date_construction: "1994-01-10",
        type_house_id: 1,
        created_at: null,
        updated_at: null,
        features: [
            {
                id: 3,
                name: "garage",
                created_at: null,
                updated_at: null,
                pivot: {
                    house_id: 1,
                    feature_id: 3
                }
            }
        ],
        type_house: {
            id: 1,
            type_house: "Townhouse",
            created_at: null,
            updated_at: null
        }
    }
];

test('Test render properties details', () => {
    render(<RenderHouses currentItems={mockHouses} />);

    // Verifica que la dirección de la propiedad se renderice
    const renderHouse = screen.getByText(/17879 Strosin Parks Suite 632\nNew Gavin, IN 82720/i);
    expect(renderHouse).toBeInTheDocument();

    // Verifica que el precio de la propiedad se renderice correctamente
    const price = screen.getByText(/\$132.912/i);
    expect(price).toBeInTheDocument();

    // Verifica que el tipo de casa se renderice
    const typeHouse = screen.getByText(/Townhouse/i);
    expect(typeHouse).toBeInTheDocument();

    // Verifica que el botón de "Schedule a visit" esté presente
    const scheduleButton = screen.getByText(/Schedule a visit/i);
    expect(scheduleButton).toBeInTheDocument();

    // Verifica que la imagen se esté mostrando
    const image = screen.getByAltText('1');
    expect(image).toBeInTheDocument();
});
