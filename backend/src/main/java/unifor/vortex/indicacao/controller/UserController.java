package unifor.vortex.indicacao.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unifor.vortex.indicacao.dto.UserCadastroDTO;
import unifor.vortex.indicacao.dto.UserLoginDTO;
import unifor.vortex.indicacao.dto.UserResponseDTO;
import unifor.vortex.indicacao.model.UserModel;
import unifor.vortex.indicacao.service.UserService;

@RestController
@RequestMapping("api/usuarios")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<UserResponseDTO> cadastrarUsuario(@RequestBody UserCadastroDTO cadastroDTO){
        UserResponseDTO novoUser = userService.cadastrar(cadastroDTO);

        return new ResponseEntity<>(novoUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@RequestBody UserLoginDTO loginDTO) {

        UserResponseDTO responseDTO = userService.autenticar(loginDTO.email(), loginDTO.senha());

        if (responseDTO != null) {
            return ResponseEntity.ok(responseDTO);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable Long id){
        UserModel user = userService.buscarPorId(id);

        return ResponseEntity.ok(UserResponseDTO.fromEntity(user));
    }



}
