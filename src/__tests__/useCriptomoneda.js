import React from 'react';
import { render, screen } from '@testing-library/react';
import Formulario from '../components/Formulario';
import userEvent from '@testing-library/user-event';
import { monedas, criptos } from '../__mocks__/criptomonedas';
import axios from 'axios';

const mockAxios = axios;

const guardarMoneda = jest.fn();
const guardarCriptomoneda = jest.fn();


test('<useCriptomoneda /> La app funciona y no se cierra', async () => {
    //Consumir datos falsos
    mockAxios.get = jest.fn().mockResolvedValue({
        data: criptos
    });

    render(
        <Formulario 
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
        />
    );

    //Verificar la cantidad de opciones de monedas
    const monedasDropdown = screen.getByTestId('select-monedas');
    expect(monedasDropdown.children.length).toEqual(monedas.length + 1);
    const opciones = screen.findAllByTestId('opcion-cripto');
    expect(await opciones).toHaveLength(10);

    //verificar si se esta llamando
    expect(mockAxios.get).toHaveBeenCalled();
    //verificar si se esta llamando una vez
    expect(mockAxios.get).toHaveBeenCalledTimes(1);

    //Seleccionar Bitcoin y USD
    userEvent.selectOptions(screen.getByTestId('select-monedas'),'USD');
    userEvent.selectOptions(screen.getByTestId('select-criptos'),'BTC');

    //Submit al formulario
    userEvent.click(screen.getByTestId('submit'));

    //Verificar que las Funciones se hayan llamado

    //verificar si se esta llamando
    expect(guardarMoneda).toHaveBeenCalled();
    //verificar si se esta llamando una vez
    expect(guardarMoneda).toHaveBeenCalledTimes(1);

    //verificar si se esta llamando
    expect(guardarCriptomoneda).toHaveBeenCalled();
    //verificar si se esta llamando una vez
    expect(guardarCriptomoneda).toHaveBeenCalledTimes(1);

    

});