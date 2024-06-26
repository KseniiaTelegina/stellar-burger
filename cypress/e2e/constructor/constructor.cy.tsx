describe('Страница конструктора бургера', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'ingredients.json',
      }).as('getIngredients');
    });

    beforeEach(() => {
      cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' }).as('loginUser');
    });

    // beforeEach(() => {
    //   cy.intercept('POST', 'api/auth/token', { fixture: 'login.json' }).as('tokenUser');
    // });
  
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
          cy.get('[data-cy="modal-overlay"]').click();
          cy.get('[data-cy="modal"]').should('not.exist');
        });


        it('имитироватация входа в систему и хранение токенов', () => {
          // Посещение страницы логина
          cy.visit('http://localhost:4000/login');
          
      
          // Заполнение формы логина
          cy.get('input[name="email"]').type('ksusha2993@gmail.com');
          cy.get('input[name="password"]').type('password');
      
          // Сабмит формы логина
          cy.get('form').submit();
      
          // Ожидание запроса логина
          cy.wait('@loginUser').its('response.statusCode').should('eq', 200);
      
          // Проверка что токены были сохранены
          cy.window().then(() => {
            cy.getCookie('accessToken').should('have.property', 'value', 'Bearer%20123')
            cy.getCookie('refreshToken').should('have.property', 'value', '2cee36f914fbe082a8db12bf0396e78c9a37c10681924412d884819ad722defcc471067647da6e5b')
          });
          
   
          
        //     cy.window().then((win) => {
        //       setTimeout(() => {
        //         expect(win.localStorage.getItem('accessToken')).to.eq('Bearer 123');
        //         expect(win.localStorage.getItem('refreshToken')).to.eq('2cee36f914fbe082a8db12bf0396e78c9a37c10681924412d884819ad722defcc471067647da6e5b');
        //     });
        //     console.log("111");
        // }, 5);
  
          // Проверка UI на новое состояние пользователя
          // cy.get('[data-cy="user-profile"]')
          //   .should('contain', 'Ксения')
          //   .and('contain', 'ksusha2993@gmail.com');
        });
    });

    // describe('Авторизация и проверка токенов', () => {
    //   beforeEach(() => {
    //     cy.intercept('POST', '**/auth/login', { fixture: 'login.json' }).as('loginUser');
    //   });
    
    //   it('имитироватация входа в систему и хранение токенов', () => {
    //     // Посещение страницы логина
    //     cy.visit('http://localhost:4000/login');
    
    //     // Заполнение формы логина
    //     cy.get('input[name="email"]').type('ksusha2993@gmail.com');
    //     cy.get('input[name="password"]').type('password');
    
    //     // Сабмит формы логина
    //     cy.get('form').submit();
    
    //     // Ожидание запроса логина
    //     cy.wait('@loginUser').its('response.statusCode').should('eq', 200);
    
    //     // Проверка что токены были сохранены
    //     cy.window().then(() => {
    //       expect(localStorage.getItem('accessToken')).to.eq('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjY5ODBiOTdlZGUwMDAxZDA2ZmJjOCIsImlhdCI6MTcxOTM5NjYwMiwiZXhwIjoxNzE5Mzk3ODAyfQ.lH-WtzvA3frdqqQrGGN-CSsTKFMvpN0zSDo1MX0pQ6');
    //       expect(localStorage.getItem('refreshToken')).to.eq('2cee36f914fbe082a8db12bf0396e78c9a37c10681924412d884819ad722defcc471067647da6e5b');
    //     });


    //     // Проверка UI на новое состояние пользователя
    //     cy.get('.user-profile')
    //       .should('contain', 'Ксения')
    //       .and('contain', 'ksusha2993@gmail.com');
    //   });
    // });
