require('dotenv').config();
const axios = require('axios');
const { 
    createBot,
    createProvider, 
    createFlow, 
    addKeyword 
} = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

const flujoMenu = addKeyword(['menu', 'opciones'])
    .addAnswer('📌 *Menú de la Universidad de San Andrés de Guanajuato*\n\n' +
        '1️⃣ *Oferta Académica*\n   - ¿Qué carreras ofrecen? (Escribe: oferta academica)\n   - ¿Cuáles son los requisitos de admisión? (Escribe: requisitos de admision)\n   - ¿Tienen maestrías o doctorados? (Escribe: maestrias y doctorados)\n\n' +
        '2️⃣ *Inscripciones y Costos*\n   - ¿Cuándo son las fechas de inscripción? (Escribe: inscripciones)\n   - ¿Cuánto cuesta la matrícula y colegiatura? (Escribe: costos)\n   - ¿Existen becas o apoyos financieros? (Escribe: becas)\n\n' +
        '3️⃣ *Vida Universitaria*\n   - ¿Qué actividades extracurriculares tienen? (Escribe: actividades extracurriculares)\n   - ¿Hay residencias estudiantiles? (Escribe: residencias estudiantiles)\n   - ¿Cómo puedo unirme a un grupo estudiantil? (Escribe: grupos estudiantiles)\n\n' +
        '4️⃣ *Trámites y Documentación*\n   - ¿Cómo solicito mi historial académico? (Escribe: historial academico)\n   - ¿Cuáles son los requisitos para titularme? (Escribe: requisitos de titulacion)\n   - ¿Dónde y cómo puedo tramitar mi credencial universitaria? (Escribe: credencial universitaria)\n\n' +
        '5️⃣ *Contacto y Soporte*\n   - ¿Cuál es el número de contacto de la universidad? (Escribe: contacto)\n   - ¿Tienen atención en línea? (Escribe: atencion en linea)\n   - ¿Dónde está ubicada la universidad? (Escribe: ubicacion)\n\n' +
        'Escribe el nombre de la opción sobre la que deseas más información. Ejemplo: *inscripciones*');

const flujoOfertaAcademica = addKeyword(['oferta academica'])
    .addAnswer("📚 Contamos con una amplia oferta académica en diversas áreas del conocimiento, desde ingeniería hasta humanidades. Consulta nuestra página web para más detalles.");

const flujoRequisitosAdmision = addKeyword(['requisitos de admision'])
    .addAnswer("📄 Para ingresar a nuestra universidad, debes presentar tu certificado de estudios, identificación oficial y aprobar el examen de admisión.");

const flujoMaestriasDoctorados = addKeyword(['maestrias y doctorados'])
    .addAnswer("🎓 Ofrecemos programas de maestría y doctorado en diversas disciplinas. Consulta nuestra convocatoria para conocer los requisitos y fechas de inscripción.");

const flujoInscripciones = addKeyword(['inscripciones'])
    .addAnswer("🗓️ Las inscripciones se realizan en periodos específicos del año. Visita nuestra web para conocer las fechas exactas.");

const flujoCostos = addKeyword(['costos'])
    .addAnswer("💰 Los costos de inscripción y colegiatura varían según la carrera. Contamos con opciones de financiamiento y becas para apoyar a nuestros estudiantes.");

const flujoBecas = addKeyword(['becas'])
    .addAnswer("🎓 Existen diferentes tipos de becas, desde académicas hasta deportivas. Infórmate sobre los requisitos y plazos de postulación en nuestra oficina de becas.");

const flujoActividadesExtracurriculares = addKeyword(['actividades extracurriculares'])
    .addAnswer("🎭 Fomentamos la participación estudiantil con actividades culturales, deportivas y de emprendimiento. ¡Únete y vive la experiencia universitaria al máximo!");

const flujoResidenciasEstudiantiles = addKeyword(['residencias estudiantiles'])
    .addAnswer("🏡 Disponemos de residencias dentro y fuera del campus. Contáctanos para conocer disponibilidad y costos.");

const flujoGruposEstudiantiles = addKeyword(['grupos estudiantiles'])
    .addAnswer("🤝 Hay múltiples grupos y asociaciones estudiantiles en los que puedes participar, desde debates hasta innovación tecnológica.");

const flujoHistorialAcademico = addKeyword(['historial academico'])
    .addAnswer("📄 Puedes solicitar tu historial académico en la oficina de control escolar o descargarlo a través de nuestro portal en línea.");

const flujoRequisitosTitulacion = addKeyword(['requisitos de titulacion'])
    .addAnswer("🎓 Para titularte, necesitas cumplir con el 100% de los créditos de tu carrera, servicio social y un trabajo final o examen profesional.");

const flujoCredencialUniversitaria = addKeyword(['credencial universitaria'])
    .addAnswer("🆔 La credencial universitaria se tramita en el área de servicios escolares y es necesaria para el acceso a las instalaciones y bibliotecas.");

const flujoContacto = addKeyword(['contacto'])
    .addAnswer("📞 Puedes comunicarte con nosotros al teléfono (XXX) XXX-XXXX o enviarnos un correo a contacto@universidad.edu.");

const flujoAtencionEnLinea = addKeyword(['atencion en linea'])
    .addAnswer("💻 Contamos con atención en línea a través de WhatsApp y nuestro portal web. Escríbenos y con gusto te atenderemos.");

const flujoUbicacion = addKeyword(['ubicacion'])
    .addAnswer("📍 Nos encontramos en Av. Universitaria #123, Guanajuato. ¡Visítanos para conocer más sobre nuestra institución!");

const flujoPrincipal = addKeyword(['hola', 'hello', 'alo'])
    .addAnswer('👋 Bienvenido a la Universidad de San Andrés de Guanajuato, ¿en qué podemos ayudarte?')
    .addAnswer('Escribe *menu* para ver las opciones disponibles.');

const flujoSecundario = addKeyword(['gracias'])
    .addAnswer('De nada, estamos para servirte. 😊');

// Función principal para iniciar el bot
const main = async () => {
    try {
        const adapterDB = new MockAdapter();
        const adapterFlow = createFlow([
            flujoPrincipal, flujoMenu, flujoOfertaAcademica, flujoRequisitosAdmision,
            flujoMaestriasDoctorados, flujoInscripciones, flujoCostos, flujoBecas,
            flujoActividadesExtracurriculares, flujoResidenciasEstudiantiles, flujoGruposEstudiantiles,
            flujoHistorialAcademico, flujoRequisitosTitulacion, flujoCredencialUniversitaria,
            flujoContacto, flujoAtencionEnLinea, flujoUbicacion, flujoSecundario
        ]);
        const adapterProvider = createProvider(BaileysProvider);

        createBot({
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB,
        });

        try {
            await QRPortalWeb();  // Si esta función es asincrónica, manejarla aquí
        } catch (error) {
            console.error('Error al ejecutar QRPortalWeb:', error);
        }
    } catch (error) {
        console.error('Error en la inicialización del bot:', error);
    }
};

// Iniciar el bot
main();
