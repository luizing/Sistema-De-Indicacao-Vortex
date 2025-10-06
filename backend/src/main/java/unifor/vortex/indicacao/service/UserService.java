package unifor.vortex.indicacao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unifor.vortex.indicacao.dto.UserCadastroDTO;
import unifor.vortex.indicacao.model.UserModel;
import unifor.vortex.indicacao.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserModel cadastrar (UserCadastroDTO dto){
        if (userRepository.findByEmail(dto.email()).isPresent()) {
            throw new IllegalArgumentException("E-mail já cadastrado.");
        }

        UserModel novoUser = new UserModel(dto.nome(),dto.email(), dto.senha());

        //Implementar aumento da pontuação do IdReferencia

        return userRepository.save(novoUser);
    }

    public UserModel buscarPorId(Long id){
        return userRepository.findById(id).orElse(null);
    }
}
