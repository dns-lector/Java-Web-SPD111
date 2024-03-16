package itstep.learning.services.db;

import java.sql.Connection;

public interface DbService {
    Connection getConnection();
}
