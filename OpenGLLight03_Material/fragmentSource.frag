#version 330 core							   
//in vec4 vertexColor;
//in vec2 TextCoord;
in vec3 FragPos;
//∑®œÚ¡ø
in vec3 Normal;

struct Material{
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	float shininess;
};

uniform Material material;
//uniform sampler2D ourTexture;
//uniform sampler2D ourFace; 	
uniform vec3 objColor;
uniform vec3 ambientColor;
uniform vec3 lightPos;
uniform vec3 lightColor;
uniform vec3 cameraPos;

out vec4 FragColor;	
void main()								   
{			
	// FragColor = mix(texture(ourTexture,TextCoord),texture(ourFace,TextCoord),0.2);
	//FragColor = texture(ourTexture,TextCoord)*texture(ourFace,TextCoord);

	
	vec3 lightDir = normalize(lightPos - FragPos);
	vec3 reflectVec =reflect(lightDir,Normal);
	vec3 cameraVec = normalize(cameraPos - FragPos);
	//specular
	float specularAmount = pow(max(dot(reflectVec,cameraVec),0.0f),material.shininess);
	vec3 specular = specularAmount*lightColor;

	//deffuse
	vec3 diffuse =material.diffuse * max(dot(lightDir,Normal),0.0f)*lightColor;
	//ambient
	vec3 ambient = material.ambient*ambientColor;

	FragColor = vec4((ambient+diffuse+specular)*objColor,1.0f);
}											   