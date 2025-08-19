<div align="center">
<h1 align="center"> 🌾Proyecto PLANT - IN: Agro Plantation APP🌾</h1>
</div>


<h2> URL API:http://ec2-3-133-160-246.us-east-2.compute.amazonaws.com:8080</h2>
<h2> Documentación API:http://ec2-3-133-160-246.us-east-2.compute.amazonaws.com:8080/swagger-ui/index.html</h2>
<h2> URL Front:https://plant-in.netlify.app</h2>

<h2> Requerimientos tecnicos Backend </h2>

La Api Rest Full utiliza Spring Boot, Java y MYSQL, Seguridad con JWT y Spring Security, maneja imagenes por medio de la Api Cloudinary, Testing automatizado con JUnit y Mockito, analisis de codigo estatico con Sonar Cloud, documentación con swagger, manejo de Logs, docker. 
Uso del patron DTO, patrones SOLID y Clean Code.

SonarCloud: https://sonarcloud.io/summary/new_code?id=Mgll3_agro-plantation-app&branch=Dev-Back

<h2><u><strong>🌱¿Qué es Plant-IN?🌱</strong></u></h2>

Esta aplicación web está diseñada para promocionar las huertas agroecológicas dentro del territorio nacional Argentino. Los productores pueden publicar información sobre sus plantaciones de vegetales y frutas, previa autorización de un administrador. Los usuarios interesados pueden conocer la ubicación, procedencia y prácticas de cada huerta para consumir de manera más consciente. Además, la plataforma incluye un foro de consejos sobre plantación y técnicas agroecológicas, accesible públicamente para la visualización pero restringido a usuarios registrados para la publicación y comentarios. También permite a los productores llevar un registro privado de sus cosechas y ofrece publicaciones de prácticas agrícolas disponibles para todos los visitantes, registrados o no.

<h3><strong><u>Les presentamos el contexto del problema por el cual nace PLANT-IN</u></strong></h3>

El modelo productivo del agronegocio tradicional se basa en la agricultura intensiva, que conduce al agotamiento del suelo y la utilización de agrotóxicos. Estos métodos no solo son perjudiciales para el medio ambiente sino también para la salud de los seres humanos y animales que consumen los productos cultivados bajo estas prácticas.

<h3><strong>Nuestra Solución</strong></h3>

La aplicación busca incentivar las prácticas agroecológicas para maximizar la producción sostenible, promoviendo la agrobiodiversidad y la resiliencia ecológica y social. Esta herramienta conecta a los consumidores con productores comprometidos con la agroecología, ofreciendo acceso a alimentos conscientes y sostenibles. Proporciona medios para la difusión, generación de conocimiento práctico y conexión entre productores y consumidores.

<h2><strong>👩‍🌾¿A que público va dirigido nuestra APP?👨‍🌾</strong></h2>

<ol>
        <li>Productores interesados en prácticas agroecológicas.</li>
        <li>Productores de huertas agroecológicas ya establecidos.</li>
        <li>Consumidores que desean comprar directamente de huertas agroecológicas o verificar la procedencia de los productos que compran.</li>
        <li>Público en general que busca informarse sobre técnicas agroecológicas.</li>
</ol>

<h2><strong>📋Casos de Uso</strong></h2>

<ol>
        <li>
            <strong>Administradores:</strong> Pueden hacer publicaciones generales en la página principal y en el apartado de noticias, así como gestionar permisos de publicación.
        </li>
        <li>
            <strong>Productores:</strong> Pueden cargar y actualizar información sobre sus cosechas, incluyendo detalles sobre las prácticas utilizadas y condiciones ambientales. También pueden consultar información sobre otras cosechas.
        </li>
        <li>
            <strong>Público en general:</strong> Tiene acceso a la información general sobre los cultivos, pero no a los detalles privados de los productores.
        </li>
        <li>
            <strong>Usuarios registrados:</strong> Pueden participar en el foro, haciendo publicaciones y comentarios sobre técnicas y experiencias agroecológicas.
        </li>
    </ol>

## 📹 Trabajo en Equipo y Feedback Profesional  

Para que este proyecto se asemeje lo más posible a una **experiencia real de trabajo**, implementamos no solo metodologías ágiles, sino también estrategias que reflejan el día a día en una empresa de tecnología.  

### 🔹 Trabajo en equipo y reuniones grabadas  
Durante el desarrollo, realizamos **dailies y reuniones de seguimiento**, las cuales fueron grabadas y subidas a YouTube. Esto permite a los reclutadores y a cualquier interesado ver:  

- Cómo nos organizamos y aplicamos **metodologías ágiles**.  
- Cómo resolvemos problemas en equipo.  
- Nuestra comunicación y toma de decisiones.  
- La evolución del proyecto a lo largo del tiempo.  

Puedes ver las grabaciones de nuestras reuniones en el siguiente [enlace de YouTube](https://www.youtube.com/channel/UCcl39YwQsEkGXnw6-jtsO3g).

### 🎓 Mentoría y Feedback Profesional  
Para potenciar aún más la experiencia, organizamos reuniones con **seniors en cada área (Frontend, Backend, QA, UX/UI)**, quienes revisarán nuestro trabajo y nos brindarán:  

- **Feedback sobre buenas prácticas y mejoras en el código.**  
- **Consejos sobre trabajo en equipo y desarrollo profesional.**  
- **Recomendaciones para enfrentar desafíos técnicos en un entorno laboral.**  

📹 Estas reuniones también serán **grabadas y compartidas**, con el objetivo de que tanto nosotros como otros desarrolladores puedan aprender de la experiencia y mejorar continuamente.  

<h2><u><strong> 🛠️ Tecnologías 🛠️</strong></u></h2>

Este proyecto está desarrollado con las siguientes tecnologías:

### Backend:
- **Java 17** y **Spring Boot 3.2.1**.
- **Spring Web** para la API REST.
- **Spring Data JPA** con **MySQL** para la persistencia de datos.
- **Spring Security** con **JWT** para la autenticación y autorización.
- **Cloudinary** para el manejo de imágenes.
- **Swagger** para la documentación de la API.
- **Log4j2** para la gestión de logs.

### Frontend:
- **TypeScript**, **ReactJS** y **Tailwind CSS**.
- **React Router DOM** para la navegación.
- **Yup** junto con **Formik** para la gestión de formularios.
- **Axios** para el consumo de APIs.
- **Leaflet** y **OpenStreetMap** para la geolocalización y visualización de mapas.

### Metodología de Desarrollo:
- El desarrollo sigue la metodología **Scrum** utilizando **Azure DevOps** para la gestión de tareas y colaboración entre los miembros del equipo.

### Pruebas y Calidad (QA):
- **Pruebas automatizadas** con **Cypress** y **JavaScript**, generando reportes con **mockawesome**.
- **Pruebas de API** realizadas con **Postman** y **Newman** para obtener reportes detallados.
- **Gestión y ejecución de pruebas manuales** mediante **QASE**, una herramienta eficaz para el seguimiento y control de los casos de prueba.
- **Pruebas automatizadas** de frontend y backend utilizando **Jest** para garantizar la calidad del código y su funcionalidad.

##  Diseño UX/UI  

- **Diseño de logo "Plant-In" e identidad visual**: Se creó el logo y la identidad visual utilizando **Adobe Illustrator**, asegurando una representación coherente y atractiva de la marca.  
- **Diseño de wireframes y prototipos**: Se diseñaron wireframes y prototipos interactivos de la página con **Figma**, enfocándose en la experiencia del usuario y la funcionalidad del diseño.  
- **Plugins de Figma utilizados**:  
  - **Pexels**: Para obtener imágenes de alta calidad y libres de derechos de autor.  
  - **Unsplash**: Para la integración de imágenes impactantes y profesionales.  
  - **Shadow Perfect**: Utilizado para agregar sombras sutiles y mejorar la percepción visual de los elementos.  
  - **Avatar Generator**: Para la creación de avatares personalizados en los prototipos.  
  - **Spectral**: Para aplicar una paleta de colores coherente y moderna.  
  - **Iconify**: Para incorporar una amplia variedad de íconos vectoriales y personalizables.  

Este enfoque permitió crear un diseño atractivo y funcional, asegurando una experiencia de usuario fluida y visualmente coherente con la identidad de la marca.


<h2><u><strong>💪Integrantes del Equipo</strong></u></h2>

<h2>👨🏻‍💻Equipo Backend👩🏻‍💻</h2>
    <ul>
        <li>
            <strong>Nombre completo:</strong> Miguel Angel Alvarez Montoya
            <ul>
                <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/mgl-dev/">Miguel Montoya</a></li>
                <li><strong>Email:</strong> miguelynando3@gmail.com</li>
                <li><strong>Github:</strong> <a href="https://github.com/Mgll3/RepositorioMgl">https://github.com/Mgll3/RepositorioMgl</a></li>
            </ul>
        </li>
      <li>
            <strong>Nombre completo:</strong> Alicia Sofia Ruiz
            <ul>
                <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/creacionesbrunila?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">Alicia Sofia Ruiz</a></li>
                <li><strong>Email:</strong> brunila110@gmail.com</li>
                <li><strong>Github:</strong> <a href="https://github.com/sofia1988">https://github.com/creacionesbrunila</a></li>
                <li><strong>Portafolio:</strong> <a href="https://portfolio-sofia-ruiz.vercel.app/">Portafolio Desarrollador Backend Sofia Ruiz</a></li>
            </ul>
        </li>
    </ul>
<h2>👨🏻‍💻Equipo Frontend✨</h2>
<ul>
    <li>
        <strong>Nombre completo:</strong> Arturo López Rosa
        <ul>
            <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/arturo-lopez-rosa/">Arturo López Rosa</a></li>
            <li><strong>Email:</strong> arturo.lopez.rosa@gmail.com</li>
            <li><strong>Github:</strong> <a href="https://github.com/ArturoFLR">https://github.com/ArturoFLR</a></li>
            <li><strong>Portafolio:</strong> <a href="https://alrportfolio.netlify.app/">Portafolio Desarrollador Frontend Arturo López Rosa</a></li>
        </ul>
    </li>
</ul>



<h2>🎭Equipo UX/UI🤩</h2>
<ul>
    <li>
        <strong>Nombre completo:</strong> Gustavo Ariel Fernández
        <ul>
            <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/gustavo-fernandez-9476b8297">Gustavo Ariel Fernández</a></li>
            <li><strong>Email:</strong> g.ariel.fernandez73@gmail.com </li>
            <li><strong>Portafolio:</strong> <a href="https://www.behance.net/gallery/182943191/Portfolio-UXUI-Designer">Portafolio UX Gustavo Fernández</a></li>
        </ul>
    </li>
</ul>


<h2>📋Equipo QA🐞</h2>
    <ul>
        <li>
            <strong>Nombre completo:</strong> Bouza Jorge Leandro
            <ul>
                <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/leandro-bouza/">Leandro Bouza</a></li>
                <li><strong>Email:</strong> jorge.leandrobouza@gmail.com</li>
                <li><strong>Github:</strong> <a href="https://github.com/JLeandroBouza">https://github.com/JLeandroBouza</a></li>
                <li><strong>Portafolio:</strong> <a href="https://leandrobouza.notion.site/Hola-Soy-Leandro-Bouza-Jr-Quality-Assurance-edf5e41907804f21a2060361501ec11f">Portafolio QA Leandro Bouza</a></li>
            </ul>
        </li>
    </ul>
    <h2>🤝Colaboradores🌟</h2>
<ul>
    <li>
        <strong>Nombre completo:</strong> Marcela Viviana Galarza
        <ul>
            <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/vivianagalarza/">Marcela Viviana Galarza</a></li>
            <li><strong>Email:</strong> marcelavivianagalarza@gmail.com</li>
            <li><strong>Portafolio:</strong> <a href="https://www.figma.com/proto/xqheOepEb8dmZj7B7mhlzt/Portfolio-Viviana?node-id=22-479&t=MwzXut1xh7WJCSif-1&scaling=scale-down&page-id=0%3A1&starting-point-node-id=22%3A479">Portafolio Viviana Galarza</a></li>
        </ul>
    </li>
    <li>
        <strong>Nombre completo:</strong> Sergio Vazquez
        <ul>
            <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/sergio-vzqz">Sergio Vazquez</a></li>
            <li><strong>Email:</strong> sergio.ivan.vzqz@gmail.com</li>
            <li><strong>Github:</strong> <a href="https://github.com/lElliotCode">https://github.com/lElliotCode</a></li>
        </ul>
    </li>
</ul>


<h2>👨🏻‍💻Resultados Backend👩🏻‍💻</h2>
    <ul>
        <li>
            <strong>Docker:</strong> <a href="https://hub.docker.com/repository/docker/mgll3/agro-plantation-app/">Proyecto</a>
        </li>        
    </ul>

<h2><strong>💻Herramientas, Frameworks y Lenguajes usados🛠️:</strong></h2>

<img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"/> <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/> <img src="https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=Spring-Security&logoColor=white"/> <img src="https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot"/> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/> <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E"/> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/> <img src="	https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"/><img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/> <img src="https://img.shields.io/badge/Azure_DevOps-0078D7?style=for-the-badge&logo=azure-devops&logoColor=white"/> <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"/> <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white"/> <img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white"/> <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/> <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white"/>



