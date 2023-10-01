package com.mercado.app.mercadol.models.service;

import com.mercado.app.mercadol.models.dao.IClienteDao;
import com.mercado.app.mercadol.models.entity.Cliente;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClienteServiceImpl implements  UserDetailsService {
    private Logger logger = LoggerFactory.getLogger(ClienteServiceImpl.class);

    @Autowired
    private IClienteDao clienteDao;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username);
        Cliente cliente = clienteDao.findByEmail(username);

        if (cliente == null) {
            logger.error("Error en el login: no existe el cliente en el sistema!");
            throw new UsernameNotFoundException("Error en el login: no existe el usuario en el sistema!");
        }

        List<GrantedAuthority> authorities = cliente.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getNombre()))
                .peek(authority -> logger.info("Role: " + authority.getAuthority()))
                .collect(Collectors.toList());

        return new User(cliente.getEmail(), cliente.getPassword(), cliente.getEnable(), true, true, true, authorities);
    }
}
