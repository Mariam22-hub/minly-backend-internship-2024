import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actor } from '../entities/Actor/actor.entity';
import { ActorDto} from '../entities/Actor/dto/actor.dto';
import { UUID } from 'crypto';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  async findActorByUuid(uuid: UUID): Promise<ActorDto> {
    try {
      const actor = await this.actorRepository.findOne({
        where: { uuid: uuid },
        relations: ['movieActors', 'movieActors.movie', 'awardsMovieActor', 'awardsMovieActor.award', 'awardsMovieActor.movie'],
      });
      if (!actor) {
        throw new Error('Actor not found');
      }
      return this.toActorDto(actor);
    } 
    catch (error) {
      console.error(error);
      throw error;
    }
  }

  private toActorDto(actor: Actor): ActorDto {
    const { id, uuid, first_name, last_name, birthdate, bio, gender, nationality, picture, number_of_awards, created_at, updated_at, movieActors, awardsMovieActor } = actor;

    return {
      id,
      uuid,
      first_name,
      last_name,
      birthdate,
      bio,
      gender,
      nationality,
      picture,
      number_of_awards,
      created_at,
      updated_at,
      movies: movieActors ? movieActors.map(ma => ({
        title: ma.movie.title,
        character: ma.character,
      })) : [],
      awards: awardsMovieActor ? awardsMovieActor.map(award => ({
        name: award.award.name,
        title: award.title,
        description: award.description,
        movie: award.movie,
        poster: award.movie.poster
      })): [],
    };
  }
}