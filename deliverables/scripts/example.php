<?php

function connection() {
    $host = 'localhost';
    $dbname = 'examen_script'; 
    $username = 'root'; 
    $password = 'root'; 

    return new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
}

function getEmployeeDetails($employee_id) {
    try {
        // Crear conexión
        $conn = connection();
        // Establecer el modo de error de PDO a excepción
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
        // Consulta SQL 
        $sql = "
            SELECT 
                e.employee_id,
                e.name AS employee_name,
                e.email,
                e.phone,
                e.hire_date,
                e.termination_date,
                d.name AS department_name,
                p.name AS position_name,
                es.name AS employee_status,
                a.address,
                a.zip_code,
                c.name AS city_name,
                s.name AS state_name,
                co.name AS country_name,
                IFNULL((SELECT GROUP_CONCAT(CONCAT(sa.amount, ':', sa.date) SEPARATOR '; ') FROM salaries sa WHERE sa.employee_id = e.employee_id), '') AS salaries,
                IFNULL((SELECT GROUP_CONCAT(CONCAT(dep.name, ':', dep.birthdate) SEPARATOR '; ') FROM dependents dep WHERE dep.employee_id = e.employee_id), '') AS dependents,
                IFNULL((SELECT GROUP_CONCAT(CONCAT(ec.name, ':', ec.phone, ':', r.name, ':', addr.address, ':', addr.zip_code, ':', cci.name, ':', ss.name, ':', coo.name) SEPARATOR '; ') 
                          FROM emergency_contacts ec 
                          JOIN relationships r ON ec.relationship_id = r.relationship_id 
                          LEFT JOIN addresses addr ON ec.address_id = addr.address_id 
                          LEFT JOIN cities cci ON addr.city_id = cci.city_id 
                          LEFT JOIN states ss ON addr.state_id = ss.state_id
                          LEFT JOIN countries coo ON addr.country_id = coo.country_id
                          WHERE ec.employee_id = e.employee_id), '') AS emergency_contacts,
                IFNULL((SELECT GROUP_CONCAT(CONCAT(edu.institution, ':', edu.degree, ':', edu.graduation_year) SEPARATOR '; ') FROM education edu WHERE edu.employee_id = e.employee_id), '') AS education,
                IFNULL((SELECT GROUP_CONCAT(CONCAT(pr.review_date, ':', pr.score) SEPARATOR '; ') FROM performance_reviews pr WHERE pr.employee_id = e.employee_id), '') AS performance_reviews
            FROM employees e
            LEFT JOIN departments d ON e.department_id = d.department_id
            LEFT JOIN positions p ON e.position_id = p.position_id
            LEFT JOIN employee_statuses es ON e.employee_status_id = es.employee_status_id
            LEFT JOIN addresses a ON e.address_id = a.address_id
            LEFT JOIN cities c ON a.city_id = c.city_id
            LEFT JOIN states s ON a.state_id = s.state_id
            LEFT JOIN countries co ON a.country_id = co.country_id
            WHERE e.employee_id = :employee_id
        ";
    
        // Preparar y ejecutar la consulta
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':employee_id', $employee_id, PDO::PARAM_INT);
        $stmt->execute();
    
        $employeeData = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if ($employeeData) {
            $result = [
                'employee' => [
                    'id' => $employeeData['employee_id'],
                    'name' => $employeeData['employee_name'],
                    'email' => $employeeData['email'],
                    'phone' => $employeeData['phone'],
                    'hire_date' => $employeeData['hire_date'],
                    'termination_date' => $employeeData['termination_date'],
                    'status' => $employeeData['employee_status'],
                    'department' => $employeeData['department_name'],
                    'position' => $employeeData['position_name'],
                    'address' => [
                        'full_address' => $employeeData['address'],
                        'zip_code' => $employeeData['zip_code'],
                        'city' => $employeeData['city_name'],
                        'state' => $employeeData['state_name'],
                        'country' => $employeeData['country_name'],
                    ],
                    'salaries' => [],
                    'dependents' => [],
                    'emergency_contacts' => [],
                    'education' => [],
                    'performance_reviews' => [],
                ],
            ];
    
            if ($employeeData['salaries']) {
                foreach (explode('; ', $employeeData['salaries']) as $salary) {
                    list($amount, $date) = explode(':', $salary);
                    $result['employee']['salaries'][] = [
                        'amount'    => $amount,
                        'date'      => $date,
                    ];
                }
            }
    
            if ($employeeData['dependents']) {
                foreach (explode('; ', $employeeData['dependents']) as $dependent) {
                    list($name, $birthdate) = explode(':', $dependent);
                    $result['employee']['dependents'][] = [
                        'name'      => $name,
                        'birthdate' => $birthdate,
                    ];
                }
            }
    
            if ($employeeData['emergency_contacts']) {
                foreach (explode('; ', $employeeData['emergency_contacts']) as $contact) {
                    list($name, $phone, $relationship, $address, $zip_code, $city, $state, $country) = explode(':', $contact);
                    $result['employee']['emergency_contacts'][] = [
                        'name'          => $name,
                        'phone'         => $phone,
                        'relationship'  => $relationship,
                        'address'       => $address,
                        'zip_code'      => $zip_code,
                        'city'          => $city,
                        'state'         => $state,
                        'country'       => $country,
                    ];
                }
            }
    
            if ($employeeData['education']) {
                foreach (explode('; ', $employeeData['education']) as $edu) {
                    list($institution, $degree, $graduation_year) = explode(':', $edu);
                    $result['employee']['education'][] = [
                        'institution'       => $institution,
                        'degree'            => $degree,
                        'graduation_year'   => $graduation_year,
                    ];
                }
            }
    
            if ($employeeData['performance_reviews']) {
                foreach (explode('; ', $employeeData['performance_reviews']) as $review) {
                    list($date, $score) = explode(':', $review);
                    $result['employee']['performance_reviews'][] = [
                        'date'  => $date,
                        'score' => $score,
                    ];
                }
            }
    
            header('Content-Type: application/json');
            echo json_encode($result, JSON_PRETTY_PRINT);
        } 
        else {
            header('Content-Type: application/json', true, 404);
            echo json_encode(['error' => 'No se encontró información para el empleado con ID: ' . $employee_id]);
        }
    } 
    catch (PDOException $e) {
        header('Content-Type: application/json', true, 500);
        echo json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]);
    }
    
    // Cerrar la conexión
    $conn = null;
}

getEmployeeDetails(1);