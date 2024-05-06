Página Principal
Registro de Usuarios
Logeo de Usuarios
Panel DashBoard (Seguimiento de Canciones , Seguimiento de Oyentes , Seguimiento de Follows)

ToDo

- Cada 30 mins comprueba los oyentes, las visualizaciones de la canción y los seguidores del artista.
- Cuando uno de ellos se actualice, cambiamos el valor del json de false a true y actualizamos la base de datos con los nuevos valores, y ejecutamos la funcion que actualizara todos los datos de la base de datos.
- Cuando los 3 son true, comenzamos a comprobar las fechas, y cuando las fechas sean diferentes, esperamos 3-4 horas y ponemos otra vez los 3 en false. Si cuando se actualiza ya ha cambiado el dia, simplemente esperamos 3 horas.
