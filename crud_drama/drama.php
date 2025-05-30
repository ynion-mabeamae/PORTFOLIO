<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE');
  header('Access-Control-Allow-Headers: Content-Type, Authorization');
  header('Content-Type: application/json; charset=utf-8');

  $server = 'localhost';
  $username = 'u937067793_ynionmabeamae';
  $password = 'Averyleuxe08$';
  $db = 'u937067793_drama';

  $conn = mysqli_connect($server, $username, $password, $db);

  if (!$conn) {
    die('Connection not found.');
  } else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $sql = "SELECT * FROM drama";

      $result = mysqli_query($conn, $sql);
      if (!$result) {
        die('Error reading from sql.');
      }

      $response = [];
      while ($row = $result->fetch_assoc()) {
        array_push($response, [
          'id' => $row['id'],
          'title' => $row['title'],
          'genre' => $row['genre'],
          'episode' => $row['episode'],
          'director' => $row['director'],
          'release_year' => $row['release_year'],
        ]);
      }

      echo json_encode($response);
  } else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $title = $_POST['title'] ?? '';
      $genre = $_POST['genre'] ?? '';
      $episode = $_POST['episode'] ?? '';
      $director = $_POST['director'] ?? '';
      $release_year = $_POST['release_year'] ?? '';

      $sql = "INSERT INTO drama(title, genre, episode, director, release_year)
              VALUES ('{$title}', '{$genre}', '{$episode}',
                      '{$director}', '{$release_year}')";

      if (!mysqli_query($conn, $sql)) {
        die(mysqli_error($conn));
      }

      echo 'Inserted successfully.';
  } else if ($_SERVER['REQUEST_METHOD'] == 'PATCH') {
      parse_str(file_get_contents('php://input'), $_PATCH);

      $id = $_PATCH['id'] ?? 0;
      $title = $_PATCH['title'] ?? '';
      $genre = $_PATCH['genre'] ?? '';
      $episode = $_PATCH['episode'] ?? '';
      $director = $_PATCH['director'] ?? '';
      $release_year = $_PATCH['release_year'] ?? '';

      $sql = "UPDATE drama SET title='{$title}', genre='{$genre}',
              episode='{$episode}', director='{$director}',
              release_year='{$release_year}' WHERE id={$id}";

      if (!mysqli_query($conn, $sql)) {
        die(mysqli_error($conn));
      }

      echo 'Updated successfully.';
  } else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
      parse_str(file_get_contents('php://input'), $_DELETE);

      $id = $_DELETE['id'] ?? '';

      $sql = "DELETE FROM drama WHERE id={$id}";

      if (!mysqli_query($conn, $sql)) {
        die(mysqli_error($conn));
      }

      echo 'Deleted successfully.';
  }

  mysqli_close($conn);
?>