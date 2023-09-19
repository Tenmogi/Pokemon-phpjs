<?php
//one method to link
$pokemonrecup = file_get_contents("php://input");
$rest_api_url = "https://pokebuildapi.fr/api/v1/pokemon/".$pokemonrecup;
$json_data = file_get_contents($rest_api_url);
echo $json_data;
?>