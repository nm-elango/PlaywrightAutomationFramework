Feature: Playwright test feature file

Scenario: Login test
    Given user is on home page
    When the user enter the login details, login should be successful
    Then logout from application