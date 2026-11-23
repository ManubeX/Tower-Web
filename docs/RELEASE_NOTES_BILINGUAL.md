# Notas de versión bilingües de SEALSWORN

La web permite cambiar entre español e inglés. Para que las notas de una GitHub Release también cambien, escribe **las dos traducciones en el cuerpo de la misma Release**, separadas por estos marcadores HTML:

```markdown
<!-- lang:es -->
# 0.21.9 — Mejoras del combate

- Nuevas animaciones.
- Correcciones de errores.

<!-- lang:en -->
# 0.21.9 — Combat improvements

- New animations.
- Bug fixes.
```

## Funcionamiento

- Con **ES**, la web muestra únicamente el bloque `lang:es`.
- Con **EN**, muestra únicamente el bloque `lang:en`.
- Las versiones antiguas sin marcadores **siguen funcionando**: se muestra su texto original en español, con una advertencia en inglés cuando el visitante utiliza EN.
- No se usa traducción automática: las notas técnicas se traducen y revisan antes de publicar.
- Para traducir versiones anteriores, edita el texto de la Release existente en GitHub y añade los dos bloques; **no es necesario subir de nuevo los archivos ni crear otra Release**.
- Conserva nombres técnicos, rutas, números de versión y comandos exactamente como aparecen en el juego.

## Publicación recomendada

1. Redacta primero las notas en español.
2. Prepara la versión inglesa, comprobando términos del juego.
3. Pega ambos bloques en el campo de descripción de GitHub Releases.
4. Publica o guarda la Release. La web utilizará automáticamente la versión correspondiente al idioma elegido.

Los marcadores `<!-- lang:es -->` y `<!-- lang:en -->` son comentarios HTML invisibles en la vista normal de GitHub, pero permiten a la web distinguir los dos idiomas.
