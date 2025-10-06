package unifor.vortex.indicacao.service;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unifor.vortex.indicacao.dto.UserCadastroDTO;
import unifor.vortex.indicacao.model.UserModel;
import unifor.vortex.indicacao.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public UserModel cadastrar (UserCadastroDTO dto){
        if (userRepository.findByEmail(dto.email()).isPresent()) {
            throw new IllegalArgumentException("E-mail já cadastrado.");
        }

        if (dto.idReferencia() != null){
            Optional<UserModel> indicadorOpt = userRepository.findById(dto.idReferencia());

            if (indicadorOpt.isPresent()){
                UserModel indicador = indicadorOpt.get();
                indicador.novoAcesso();
                userRepository.save(indicador);
            }
        }

        UserModel novoUser = new UserModel(dto.nome(),dto.email(), dto.senha());

        return userRepository.save(novoUser);
    }

    public UserModel buscarPorId(Long id){
        return userRepository.findById(id).orElse(null);
    }
}
