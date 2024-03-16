package itstep.learning.services.hash;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

public class Md5HashService implements HashService {
    @Override
    public String digest(String input) {
        try {
            StringBuilder sb = new StringBuilder();
            for (byte b :
                    MessageDigest.getInstance("MD5").digest(
                            input.getBytes(StandardCharsets.UTF_8)
                    )) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        }
        catch (Exception ignore) {
            return null;
        }
    }
}
/*
Д.З. Реалізувати сторінку "Акційні пропозиції" з шаблонізацією
- створити DAL об'єкти (DTO, DAO) для сутності "Акція", впровадити
    повернення тестового масиву акційніх товарів.
- створити сервлет, переспрямувати запит на шаблон
- створити представлення (JSP), відобразити дані
 */