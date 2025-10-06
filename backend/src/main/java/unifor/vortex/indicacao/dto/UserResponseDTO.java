package unifor.vortex.indicacao.dto;

import unifor.vortex.indicacao.model.UserModel;

public record UserResponseDTO (
    Long id,
    String nome,
    int pontuacao,
    String token
){
    public static UserResponseDTO fromEntity(UserModel user){
        return new UserResponseDTO(
                user.getId(),
                user.getNome(),
                user.getPontuacao(),
                null
        );
    }
    public static UserResponseDTO fromEntityWithToken(UserModel user, String token){
        return new UserResponseDTO(
                user.getId(),
                user.getNome(),
                user.getPontuacao(),
                token
        );
    }
}
