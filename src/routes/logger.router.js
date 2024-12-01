import { Router} from 'express';
const router = Router();

router.get("/", (req, res) => {
    // Prueba de los niveles de log
    req.logger.debug("Este es un mensaje de nivel DEBUG");
    req.logger.http("Este es un mensaje de nivel HTTP");
    req.logger.info("Este es un mensaje de nivel INFO");
    req.logger.warning("Este es un mensaje de nivel WARNING");
    req.logger.error("Este es un mensaje de nivel ERROR");
    req.logger.fatal("Este es un mensaje de nivel FATAL");

    res.send("Prueba de logger completada. Revisa la consola y el archivo errors.log si es producción.");
});
export default router;