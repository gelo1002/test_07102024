
CREATE TABLE countries (
    country_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(100)
);

CREATE TABLE cities (
    city_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT ,
    name VARCHAR(100)
);

CREATE TABLE states (
    state_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(100)
);

CREATE TABLE positions (
    position_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(100)
);

CREATE TABLE departments (
    department_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(100)
);

CREATE TABLE relationships (
    relationship_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50)
);

CREATE TABLE employee_statuses (
    employee_status_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50)
);

CREATE TABLE addresses (
    address_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    address VARCHAR(255),
    zip_code VARCHAR(10),
    city_id INT,
    state_id INT,
    country_id INT,
    FOREIGN KEY (city_id) REFERENCES cities(city_id),
    FOREIGN KEY (state_id) REFERENCES states(state_id),
    FOREIGN KEY (country_id) REFERENCES countries(country_id)
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    manager_id INT,
    department_id INT,
    position_id INT,
    address_id INT,
    employee_status_id INT,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    hire_date DATE,
    termination_date DATE,
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id),
    FOREIGN KEY (address_id) REFERENCES addresses(address_id),
    FOREIGN KEY (position_id) REFERENCES positions(position_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    FOREIGN KEY (employee_status_id) REFERENCES employee_statuses(employee_status_id)
);

CREATE TABLE salaries (
    salary_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    employee_id INT,
    amount DECIMAL(10, 2),
    date DATE,
    status TINYINT(1),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

CREATE TABLE dependents (
    dependent_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    employee_id INT,
    relationship_id INT,
    name VARCHAR(255),
    birthdate DATE,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (relationship_id) REFERENCES relationships(relationship_id)
);

CREATE TABLE emergency_contacts (
    contact_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    employee_id INT,
    address_id INT,
    relationship_id INT,
    name VARCHAR(255),
    phone VARCHAR(20),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (address_id) REFERENCES addresses(address_id),
    FOREIGN KEY (relationship_id) REFERENCES relationships(relationship_id)
);

CREATE TABLE education (
    education_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    employee_id INT,
    institution VARCHAR(255),
    degree VARCHAR(100),
    graduation_year INT,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

CREATE TABLE performance_reviews (
    review_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    employee_id INT,
    review_date DATE,
    score INT,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);


INSERT INTO `countries` (`country_id`, `name`) VALUES (NULL, 'countries');
INSERT INTO `cities` (`city_id`, `name`) VALUES (NULL, 'cities');
INSERT INTO `departments` (`department_id`, `name`) VALUES (NULL, 'department');
INSERT INTO `positions` (`position_id`, `name`) VALUES (NULL, 'positions');
INSERT INTO `states` (`state_id`, `name`) VALUES (NULL, 'states');
INSERT INTO `relationships` (`relationship_id`, `name`) VALUES (NULL, 'relationships');
INSERT INTO `employee_statuses` (`employee_status_id`, `name`) VALUES (NULL, 'employee_statuses');

INSERT INTO `addresses` (`address_id`, `address`, `zip_code`, `city_id`, `state_id`, `country_id`) VALUES (NULL, 'dirección 1', '02000', '1', '1', '1');
INSERT INTO `employees` (`employee_id`, `manager_id`, `department_id`, `position_id`, `address_id`, `employee_status_id`, `name`, `email`, `phone`, `hire_date`, `termination_date`) VALUES (NULL, NULL, '1', '1', '1', '1', 'Angel', 'angel01@test.com', '5512345678', '2024-10-07', NULL);