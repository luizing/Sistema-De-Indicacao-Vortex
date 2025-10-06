package unifor.vortex.indicacao.service;

import jakarta.transaction.Transactional;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import unifor.vortex.indicacao.dto.UserCadastroDTO;
import unifor.vortex.indicacao.dto.UserResponseDTO;
import unifor.vortex.indicacao.model.UserModel;
import unifor.vortex.indicacao.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public UserResponseDTO cadastrar (UserCadastroDTO dto){
        if (userRepository.findByEmail(dto.email()).isPresent()) {
            throw new IllegalArgumentException("E-mail já cadastrado.");
        }

        UserModel novoUser = new UserModel(dto.nome(), dto.email(), (passwordEncoder.encode(dto.senha())));

        UserModel usuarioSalvo = userRepository.save(novoUser);

        if (dto.idReferencia() != null){
            Optional<UserModel> indicadorOpt = userRepository.findById(dto.idReferencia());

            if (indicadorOpt.isPresent()){
                UserModel indicador = indicadorOpt.get();
                indicador.novoAcesso();
                userRepository.save(indicador);
            }
        }
        String token = jwtService.generateToken(usuarioSalvo.getId(), usuarioSalvo.getEmail());

        return UserResponseDTO.fromEntityWithToken(usuarioSalvo, token);
    }

    public UserModel autenticar (String email, String senha){
        Optional<UserModel> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            return null;
        }

        UserModel user = userOpt.get();

        if (passwordEncoder.matches(senha, user.getSenhaHash())) {
            return user;
        } else {
            return null;
        }
    }

    public UserModel buscarPorId(Long id){
        return userRepository.findById(id).orElse(null);
    }
}
