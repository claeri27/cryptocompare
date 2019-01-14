namespace :start do
  task :development do
    exec 'heroku local -f Procfile.dev'
  end
end

desc 'Starting the development server'
task :start => 'start:development'
