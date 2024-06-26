describe('Страница конструктора бургера', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'ingredients.json',
      }).as('getIngredients');
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

      // // Добавление начинки
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
          
          // Кликнуть на ингредиент снова для открытия модального окна
          // cy.get('[data-cy="ingredient-item-1"]').click();
          // cy.get('[data-cy="modal"]').should('be.visible');
     
         // Закрыть модальное окно по клику на оверлей //настроить
        //   cy.get('[data-cy="modal-overlay"]').click();
        //   cy.get('[data-cy="modal"]').should('not.exist');
        });
    });

