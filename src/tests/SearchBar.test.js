import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import MealsProvider from '../context/MealsProvider';
import Recipes from '../pages/Recipes';
import mealMock from './helpers/mocks/mealMock';
import oneMealMock from './helpers/mocks/oneMealMock';
import drinkMock from './helpers/mocks/drinkMock';
import oneDrinkMock from './helpers/mocks/oneDrinkMock';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Testes para o Componente Search bar', () => {
  const searchInput = 'search-input';
  const searchTopBtn = 'search-top-btn';
  const execSearchBtn = 'exec-search-btn';
  // const chickenHandi = 'Chicken Handi';

  it.only('1) Verifica a busca sem filtros', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealMock),
    });

    renderWithRouter(
      <MealsProvider>
        <Recipes />
      </MealsProvider>,
      '/meals',
    );
    await screen.findByText('Chicken Handi');
    const searchBtn = await screen.findByTestId(searchTopBtn);
    userEvent.click(searchBtn);
    // const inputSearch = await screen.findByTestId(searchInput);
    // const inputButton = screen.getByTestId(execSearchBtn);
    // userEvent.type(inputSearch, 'chicken');
    // expect(inputSearch).toHaveValue('chicken');
    // const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    // const nameRadio = screen.getByTestId('name-search-radio');
    // const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    // userEvent.click(firstLetterRadio);
    // userEvent.click(nameRadio);
    // userEvent.click(ingredientRadio);
    // userEvent.click(inputButton);
    // await screen.findByText(chickenHandi);
    // await screen.findByText('Chicken Congee');
  });

  it('2) Verifica a busca que retorna um unico meal ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMealMock),
    });

    const { history } = renderWithRouter(
      <MealsProvider>
        <Recipes />
      </MealsProvider>,
      '/meals',
    );
    const searchBtn = await screen.findByTestId(searchTopBtn);
    userEvent.click(searchBtn);
    const inputSearch = screen.getByTestId(searchInput);
    const inputButton = screen.getByTestId(execSearchBtn);
    userEvent.type(inputSearch, 'chicken');
    expect(inputSearch).toHaveValue('chicken');
    userEvent.click(inputButton);
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52795'));
  });

  it('Verifica a busca por drinks', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkMock),
    });

    renderWithRouter(
      <MealsProvider>
        <Recipes />
      </MealsProvider>,
      '/drinks',
    );

    const searchBtn = await screen.findByTestId(searchTopBtn);
    userEvent.click(searchBtn);
    const inputSearch = screen.getByTestId(searchInput);
    const inputButton = screen.getByTestId(execSearchBtn);
    userEvent.type(inputSearch, 'Rum');
    expect(inputSearch).toHaveValue('Rum');
    userEvent.click(inputButton);
    await screen.findByText('Rum Sour');
    await screen.findByText('Rum Toddy');
  });

  it('Verifica a busca que retorna um único drink', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrinkMock),
    });

    const { history } = renderWithRouter(
      <MealsProvider>
        <Recipes />
      </MealsProvider>,
      '/drinks',
    );

    const searchBtn = await screen.findByTestId(searchTopBtn);
    userEvent.click(searchBtn);
    const inputSearch = screen.getByTestId(searchInput);
    const inputButton = screen.getByTestId(execSearchBtn);
    userEvent.type(inputSearch, 'Rum');
    expect(inputSearch).toHaveValue('Rum');
    userEvent.click(inputButton);
    await screen.findByText('Rum Sour');
    expect(history.location.pathname).toBe('/drinks/52795');
  });

  it('Verifica o alert ao buscar algo inexistente em meals', async () => {
    const mealAlertMock = {
      meals: null,
    };

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealAlertMock),
    });

    jest.spyOn(window, 'alert').mockImplementation(() => 'Sorry, we haven\'t found any recipes for these filters.');

    renderWithRouter(
      <MealsProvider>
        <Recipes />
      </MealsProvider>,
      '/meals',
    );

    const searchBtn = await screen.findByTestId(searchTopBtn);
    userEvent.click(searchBtn);
    const inputSearch = screen.getByTestId(searchInput);
    const inputButton = screen.getByTestId(execSearchBtn);
    userEvent.type(inputSearch, 'xablau');
    userEvent.click(inputButton);
  });

  it('Verifica o alert ao buscar algo inexistente em drinks', async () => {
    const mealAlertMock = {
      meals: null,
    };

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealAlertMock),
    });

    jest.spyOn(window, 'alert').mockImplementation(() => 'Sorry, we haven\'t found any recipes for these filters.');

    renderWithRouter(
      <MealsProvider>
        <Recipes />
      </MealsProvider>,
      '/drinks',
    );

    const searchBtn = await screen.findByTestId(searchTopBtn);
    userEvent.click(searchBtn);
    const inputSearch = await screen.findByTestId(searchInput);
    const inputButton = screen.getByTestId(execSearchBtn);
    userEvent.type(inputSearch, 'xablau');
    userEvent.click(inputButton);
  });
});
