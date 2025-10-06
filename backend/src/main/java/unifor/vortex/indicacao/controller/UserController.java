package unifor.vortex.indicacao.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unifor.vortex.indicacao.dto.UserCadastroDTO;
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
        UserModel novoUser = userService.cadastrar(cadastroDTO);

        return new ResponseEntity<>(UserResponseDTO.fromEntity(novoUser), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable Long id){
        UserModel user = userService.buscarPorId(id);

        return ResponseEntity.ok(UserResponseDTO.fromEntity(user));
    }



}
