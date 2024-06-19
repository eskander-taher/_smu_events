describe("Admin Login", () => {
	it("should log in as admin", () => {
		cy.visit("http://localhost:5173/auth/login");
		cy.get('input[name="email"]').type("admin@gmail.com");
		cy.get('input[name="password"]').type("123");
		cy.get('input[type="submit"]').click();
		cy.contains("Добро пожаловать Ескандер").should("be.visible");
	});
});

describe('Create Event', () => {
  before(() => {
    cy.visit('http://localhost:5173/auth/login');
    cy.get('input[name="email"]').type('admin@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('input[type="submit"]').click();
    cy.contains('Добро пожаловать Ескандер').should('be.visible');
  });

  it('should navigate to the add-event page and create an event', () => {
    cy.visit('http://localhost:5173/events-dashboard/add-event');
    cy.get('input[placeholder="Введите название мероприятия"]').should('be.visible').type('Test Event');
    cy.get('select').first().should('be.visible').select('идет');
    cy.get('input[placeholder="Введите номер секции"]').eq(0).should('be.visible').type('1');
    cy.get('input[placeholder="Введите название секции"]').eq(0).should('be.visible').type('Section 1');
    cy.get('select[name="mods"]').eq(0).should('be.visible').select(1);
    cy.contains('Добавить секцию').should('be.visible').click();
    cy.get('input[placeholder="Введите номер секции"]').eq(1).should('be.visible').type('2');
    cy.get('input[placeholder="Введите название секции"]').eq(1).should('be.visible').type('Section 2');
    cy.get('select[name="mods"]').eq(1).should('be.visible').select(2);
    cy.get('.jodit-wysiwyg').should('be.visible').type('This is a test event description.');
    cy.get('input[type="submit"]').should('be.visible').click();
    cy.contains('Мероприятие добавлено успешно').should('be.visible');
  });

  it('should verify the event creation on the events page', () => {
    cy.visit('http://localhost:5173/events');
    cy.contains('.rounded-sm', 'Test Event').should('be.visible');
    cy.contains('.text-sm', 'идет').should('be.visible');
  });
});
