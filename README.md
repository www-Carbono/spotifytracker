Página Principal
Registro de Usuarios
Logeo de Usuarios
Panel DashBoard (Seguimiento de Canciones , Seguimiento de Oyentes , Seguimiento de Follows)

Cosas a Realizar

[DONE] - En la base de datos de la comprobación de actualización, añadir la fecha a la que está actualizada, para asi cuando añadamos un nuevo elemento pillaremos esa fecha.
[DONE] - Cuando creamos un nuevo elemento, vamos a la base de datos de comprobación de actualización y pìllamos la fecha y la guardamos como primeros datos en la BD.
[DONE] - Cada 10 minutos comprobar Si las visualizaciones de la cancion que utilizamos para comprobar han cambiado.
[DONE] - Cada una de las 3 actualizaciones dependera de su fecha etc.
[DONE] - Cuando las visualizaciones de la cancion que utilizamos cambien, actualizamos la fecha de la base de datos de comprobaciones.
[InProgress] - A continuación comprobaremos todos los datos de nuestra base de datos y hacemos que se ejecute un bucle comparando las visualizaciones guardadas con las actuales hasta que sean diferentes.
[InProgress] - Si después de N intentos, no cambia, pues ponemos las mismas visualizaciones que el dia anterior. (N = 5 en un lapso de 10 minutos??)
[InProgress] - Una vez que actualizamos la base de datos, pillamos otra vez la fecha guardada de la base de datos de comprobacion y la añadimos al array

<!-- - Una vez que han cambiado esas, comenzamos a comprobar todos los datos que tenemos guardados en bucle hasta que cambie el número de visualizaciones. Si despues de N intentos, no cambia, pues ponemos 0. (5 intentos en un lapso de 10 minutos??) Una vez actualiza, pillamos la ultima fecha que tenemos guardada y le añadimos un dia. (comprobar dia, mes y año etc) -->
