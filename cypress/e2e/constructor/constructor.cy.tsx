describe('Страница конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json',
    }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    });
    cy.intercept('POST', 'api/orders', { 
      fixture: 'order.json'
    }).as('postOrder');

    // подставляем моковые токены
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  afterEach(function () {
    // очистка хранлищ после выполнения теста 
    cy.clearLocalStorage();
    cy.clearCookies();
  });
  
  it('показывать прелоадер во время загрузки ингредиентов', () => {
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
    cy.get('main').should('contain', 'Соберите бургер');
    cy.get('h1').should('contain', 'Соберите бургер');
  });
  
  it('показывать ошибку при неудачном получении ингредиентов', () => {
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  it('тестировать добавление булок и начинок в конструктор', () => {
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
    // Добавление булки
    cy.get('[data-ing="ingredient-item-bun"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-bun-1"]').should('exist');
    cy.get('[data-cy="constructor-bun-2"]').should('exist');

    // Добавление начинки
    cy.get('[data-ing="ingredient-item-main"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-topping"]').should('exist');

    cy.get('[data-ing="ingredient-item-sauce"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-topping"]').should('exist');
  });

  it('открывать и закрывать модальное окно ингредиента', () => {
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
          
    // // Кликнуть на ингредиент для открытия модального окна
    cy.get('[data-cy="ingredient-item-1"]').click();
    cy.get('[data-cy="modal"]').should('be.visible');
          
    // Закрыть модальное окно по клику на крестик
    cy.get('[data-cy="modal-close-btn"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    // Закрыть модальное окно по клику на оверлей //настроить
      // cy.get('[data-cy="modal-overlay"]').click();
      // cy.get('[data-cy="modal-overlay"]').should('not.exist');
  });

  it('создание заказа', () => {
    //собираем бургер
    cy.get('[data-ing="ingredient-item-bun"]').contains('Добавить').click();
    cy.get('[data-ing="ingredient-item-main"]').contains('Добавить').click();
    cy.get('[data-ing="ingredient-item-sauce"]').contains('Добавить').click();

    //Вызывается клик по кнопке «Оформить заказ».
    cy.get('[data-cy=order-summ] button').click();

    //Проверяется, что модальное окно открылось и номер заказа верный.
    cy.get('[data-cy=modal]').contains('44330').should('exist');

    //Закрывается модальное окно и проверяется успешность закрытия.
    cy.get('[data-cy="modal-close-btn"]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    //Проверяется, что конструктор пуст.
    cy.get('[data-cy=constructor]')
      .contains('Ингредиент 1')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Ингредиент 3')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Ингредиент 4')
      .should('not.exist');
  });
});

