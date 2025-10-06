package unifor.vortex.indicacao.dto;


public record UserCadastroDTO(
        String nome,
        String email,
        String senha,
        Long idReferencia
) {

}
