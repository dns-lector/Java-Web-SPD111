package itstep.learning.ioc;

import com.google.inject.servlet.ServletModule;
import itstep.learning.filters.CharsetFilter;
import itstep.learning.servlets.*;

public class RouterModule extends ServletModule {
    @Override
    protected void configureServlets() {
        filter( "/*" ).through( CharsetFilter.class ) ;

        serve( "/"       ).with( HomeServlet.class   ) ;
        serve( "/auth"   ).with( AuthServlet.class   ) ;
        serve( "/cart"   ).with( CartServlet.class   ) ;
        serve( "/shop"   ).with( ShopServlet.class   ) ;
        serve( "/signup" ).with( SignupServlet.class ) ;

        serve( "/shop-api"   ).with( ShopApiServlet.class ) ;
    }
}
