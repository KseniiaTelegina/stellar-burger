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
      cy.get('[data-cy="bun-ingredients"]').contains('Добавить').click();
      cy.get('[data-cy="constructor-bun-1"]').contains('Ингредиент 1').should('exist');
      cy.get('[data-cy="constructor-bun-2"]').contains('Ингредиент 1').should('exist');

      // Добавление начинки
      // cy.get('[data-cy="ingredient-item-2"]').contains('Добавить').click();
      // cy.get('[data-cy="constructor-item"]').contains('Ингредиент 2').should('exist');
    });





        // it('открывать и закрывать модальное окно ингредиента', () => {
        //   cy.visit('http://localhost:4000');
        //   cy.wait('@getIngredients');
          
        //   // // Кликнуть на ингредиент для открытия модального окна
        //   cy.get('[data-cy="ingredient-item-1"]').click();
        //   cy.get('[data-cy="modal"]').should('be.visible');
          
        //   // Закрыть модальное окно по клику на крестик
        //   cy.get('[data-cy="modal-close-btn"]').click();
        //   cy.get('[data-cy="modal"]').should('not.exist');
          
        //   // Кликнуть на ингредиент снова для открытия модального окна
          // cy.get('[data-cy="ingredient-item-1"]').click();
          // cy.get('[data-cy="modal"]').should('be.visible');
     
        //  // Закрыть модальное окно по клику на оверлей //настроить
          // cy.get('[data-cy="modal-overlay"]').click();
          // cy.get('[data-cy="modal"]').should('not.exist');
        // });
    });

        // it('добавляет ингредиент из списка в конструктор по нажатию кнопки "Добавить"', () => {
    //     cy.visit('http://localhost:4000');
    //     cy.wait('@getIngredients');

    //     // Найти и нажать кнопку "Добавить" для булки

    //     cy.get('[data-cy="ingredient-add-button-bun"]')
    //       .should('exist')
    //       .click();
    
    //     // Проверить, что булка добавлена в конструктор
    //     cy.get('[data-cy=constructor-bun-top]').should('exist');
    //     cy.get('[data-cy=constructor-bun-bottom]').should('exist');
    
    //     // Найти и нажать кнопку "Добавить" для начинки
    //     cy.get('[data-cy=ingredient-add-button-main]')
    //       .should('exist')
    //       .click();
    
    //     // Проверить, что "main" ингредиент добавлен в конструктор
    //     cy.get('[data-cy=constructor-ingredients]')
    //       .children()
    //       .should('have.length', 1);
    
    //     // Найти и нажать кнопку "Добавить" для соуса
    //     cy.get('[data-cy=ingredient-add-button-sauce]')
    //       .should('exist')
    //       .click();
    
    //     // Проверить, что "sauce" ингредиент добавлен в конструктор
    //     cy.get('[data-cy=constructor-ingredients]')
    //       .children()
    //       .should('have.length', 2);
    //   });


        // cy.get('[data-cy=ingredient-item-bun]').contains('Добавить').click();
        // cy.get('[data-cy=constructor-bun-top]')
        //   .contains('bun')
        //   .should('exist');
        // cy.get('[data-cy=constructor-bun-bottom]')
        //   .contains('bun')
        //   .should('exist');

        //   cy.get('[data-cy=ingredient-item-main]').contains('Добавить').click();
        //   cy.get('[data-cy=constructor-ingredients]')
        //     .contains('main')
        //     .should('exist');
    
