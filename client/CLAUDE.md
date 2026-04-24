# Sismacv2 - FrontEnd (Client)

Pagina web institucional con apariencia de sistema operativo (especificamente windows 11), echo con React y CSS usando metodologia BEM y variables de estilo. Pensado en la escalabilidad y modularizacion del sitio, con proyeccion a la facil implementacion de nuevas funcionalidades y pensado para a futuro implementar un backend

# Variables CSS

Todas las variables css estan situadas en variables.css, en el proyecto queda terminantemente prohibido un valor harcodeado como #fff, rgba(...), etc. En caso de necesitar un nuevo color, o variante general, se debe implementar primero en variables.css para su uso posterior.

## Clases CSS

Todas las clases el 100% de los casos, se deben escribir con la metodologia BEM.

## Iconos

En caso de que se necesite usar iconos, se dispone de la libreria react-icons la cual debes tener siempre presente de que existe por si necesitas alguno.

## Keyframes

Los keyframes NUNCA se declaran en archivos de componente; van en src/styles/animations.css

## Responsive

El proyecto actualmente esta trabajando el responsive con DesktopFirst, posteriormente se codifica para version mobil hasta llegar a la medida minima de 320px

## Comentarios

Los comentarios implementados deberan ser lo mas minimalistas posibles, sin caracteres raros como guiones o iguales, se debera intentar escribir como una persona real, sin tanta divagacion