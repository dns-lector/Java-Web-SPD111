package itstep.learning.ioc;

import com.google.inject.servlet.ServletModule;
import itstep.learning.servlets.*;

public class RouterModule extends ServletModule {
    @Override
    protected void configureServlets() {
        serve( "/" ).with( HomeServlet.class ) ;
        serve( "/auth" ).with( AuthServlet.class ) ;
        serve( "/cart" ).with( CartServlet.class ) ;
        serve( "/signup" ).with( SignupServlet.class ) ;
    }
}
