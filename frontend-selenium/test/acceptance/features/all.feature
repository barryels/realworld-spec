Feature: Home page

  @screen @skip
  Scenario: Home
      Given I am on the HOME screen
      Then I should see the Header Navigation
      Then I should see the primary title "conduit"
      Then I should see the paragraph "A place to share your knowledge."


  @navigation @skip
  Scenario: Header Navigation
      Given I am on the HOME screen
      Given I click the "Sign in" link
      Given I wait for 1 seconds
      Then I am on the LOGIN screen
      Given I click the "Sign up" link
      Given I wait for 1 seconds
      Then I am on the REGISTER screen
      Given I click the "Home" link
      Given I wait for 1 seconds
      Then I am on the HOME screen


  @screen @skip
  Scenario: Login
      Given I am on the LOGIN screen
      Then I should see the Header Navigation
      Then I should see the primary title "Sign in"
      Then I should see the link "Need an account?"
      Then I should see the LOGIN form


  @screen @skip
  Scenario: Register
      Given I am on the REGISTER screen
      Then I should see the Header Navigation
      Then I should see the primary title "Sign up"
      Then I should see the link "Have an account?"
      Then I should see the REGISTER form


  @user @_skip
  Scenario: Register as a new user
    Given I am on the REGISTER screen
    Given I type "${fixtures.users.USER_1.registrationDetails.username}" into the "Username" input
    Given I type "${fixtures.users.USER_1.registrationDetails.emailAddress}" into the "Email" input
    Given I type "${fixtures.users.USER_1.registrationDetails.password}" into the "Password" input
    Given I click the "Sign up" button
    # Then Form should be disabled
    Then I wait for 3 seconds
    Then I am on the HOME screen


  @user @skip
  Scenario: Register as a new user with existing user details
    Given I am on the REGISTER screen
    Given I type "${fixtures.users.EXISTING_USER.registrationDetails.username}" into the "Username" input
    Given I type "${fixtures.users.EXISTING_USER.registrationDetails.emailAddress}" into the "Email" input
    Given I type "${fixtures.users.EXISTING_USER.registrationDetails.password}" into the "Password" input
    Given I click the "Sign up" button
    # Then Form should be disabled
    # Then I should see the text "username is too long (maximum is 20 characters)"
    Then I should see the text "email has already been taken"
    Then I should see the text "username has already been taken"

  @screen @skip
  Scenario: Login (testing input with placeholder)
      Given I am on the LOGIN screen
      Then I should see the input with placeholder "Email"
      Then I should see the input with placeholder "Password"


  @screen @article @skip
  Scenario: View articles by tag


  @screen @article @skip
  Scenario: Article Detail View (ARTICLE_1)
      Given I am on the ARTICLE_1 screen
      Then I should see the Header Navigation
      Then I should see the primary title "1"
      Then I should see the link "slava"
      Then I should see the text "May 3, 2016"


  @user @skip
  Scenario: Log in


  @user @skip
  Scenario: Log out


  @user @skip
  Scenario: Update my settings


  @article @skip
  Scenario: Create a new article
      Given I am logged in as USER_A
      Given I am on the EDITOR screen
      Then I should see the Header Navigation
      Then I should see the input with placeholder "Article Title"
      Then I should see the input with placeholder "What's this article about?"
      Then I should see the textarea with placeholder "Write your article (in markdown)"
      Then I should see the input with placeholder "Enter Tags"


  @article @skip
  Scenario: Edit an existing article


  @article @comment @skip
  Scenario: Comment on another users article


  @article @comment @skip
  Scenario: Delete one of my comments


  @article @favorite @skip
  Scenario: Favorite an article


  @article @favorite @skip
  Scenario: Unfavorite an article


  @user @follow @skip
  Scenario: Follow a user


  @user @follow @skip
  Scenario: Unfollow a user
