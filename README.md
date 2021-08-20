En el presente archivo, se provee una serie de pasos y acotaciones a tener en cuenta a la hora de inicar el proyecto.

Antes de iniciar el proyecto cabe destacar que los datos no se guardan actualmente en mongodb de forma local, las mismas se guardan en MongoDB Atlas, he enviado via correo electronico, la cuenta asociada de MongoDB Atlas junto con la contraseña en caso de que se desee revisar los datos de la misma. Dicha cuenta ya tiene configurado el 'Network Access' para que cualquier ip se conecte. En caso de que surga algun tipo de problema, se puede crear una cuenta de MongoDB Atlas y cambiar el archivo de configuracion. (Dentro de la carpeta config propiedad URI de su propiedad padre db).


Para iniciar el proyecto correctamente basta con ejecutar el comando 'npm run dev'. El proyecto se deberia de ejecutar en el puerto 3000.
Para iniciar las pruebas basta con ejecutar el comando 'npm run test'
# **Nota**
- No cambiar el puerto ya que podrian haber problemas de comunicacion con el cliente y con el google developer platform.
- Cabe destacar que por fines practicos y ya que no se realizó el deployment del proyecto, se subió al repositorio el archivo de configuraciones, con la finalidad de que se haga mas facil correr ambos proyectos. Claramente en un ambito profesional dicho archivo debe de ser ignorado por git.
-No ejecutar la aplicacion del lado del cliente hasta que aparezca el mensaje 'connectado a mongodb'.