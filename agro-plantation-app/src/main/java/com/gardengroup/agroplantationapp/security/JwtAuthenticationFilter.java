package com.gardengroup.agroplantationapp.security;

import com.gardengroup.agroplantationapp.entities.User;
import com.gardengroup.agroplantationapp.entities.UserType;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private CustomUsersDetailsService customUsersDetailsService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private String getRequestToken(HttpServletRequest httpServletRequest) {
        String bearerToken = httpServletRequest.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            // Agrega un espacio después de "Bearer" para asegurarte de que el token se extraiga correctamente
            return bearerToken.substring(7, bearerToken.length());
        }

        return null;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // Obtiene el token de la solicitud
        String token = getRequestToken(request);

        // Verifica si el token no está vacío y es válido
        if (StringUtils.hasText(token) && jwtTokenProvider.validateToken(token)) {

            // Obtiene el email del usuario a partir del token
            String email = jwtTokenProvider.getJwtUser(token);

            // Carga los detalles del usuario utilizando el servicio de detalles personalizado
            UserDetails userDetails = customUsersDetailsService.loadUserByUsername(email);
            User user = (User) userDetails;

            // Obtiene las autoridades (roles) del usuario
            Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();


            // Obtiene el tipo de usuario directamente desde el objeto User
            UserType userType = user.getUserType();

            // Verifica si el tipo de usuario es "USER" o "PRODUCER"
            if ("USER".equals(userType.getType()) || "PRODUCER".equals(userType.getType())) {

                // Crea un token de autenticación
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                // Establece los detalles de la autenticación basados en la solicitud
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Establece la autenticación en el contexto de seguridad de Spring
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }

        // Continúa con la cadena de filtros
        filterChain.doFilter(request, response);
    }

}
